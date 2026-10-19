using System.Text;
using Aura.Api.Data;
using Aura.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IO.Compression;

var builder = WebApplication.CreateBuilder(args);

// ─── Services ─────────────────────────────────────────────────────
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        // Hemat payload: jangan kirim null
        options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ─── Compression (Brotli+Gzip): JSON ~70-80% lebih kecil ──────────
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});
builder.Services.Configure<BrotliCompressionProviderOptions>(o => o.Level = CompressionLevel.Fastest);
builder.Services.Configure<GzipCompressionProviderOptions>(o => o.Level = CompressionLevel.Fastest);

// ─── Caching: response + output (GET /api/projects dsb) ───────────
builder.Services.AddResponseCaching();
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(p => p.Expire(TimeSpan.FromSeconds(60)));
    options.AddPolicy("Api60s", p => p.Expire(TimeSpan.FromSeconds(60)));
});

// ─── Health (load balancer / uptime) ──────────────────────────────
builder.Services.AddHealthChecks();

// ─── EF Core + SQLite (pooled + NoTracking + WAL) ─────────────────
builder.Services.AddDbContextPool<AuraDbContext>(options =>
{
    var dbPath = Path.Combine(AppContext.BaseDirectory, "aura.db");
    options.UseSqlite($"Data Source={dbPath};Cache=Shared");
    // Read-heavy API: tanpa change-tracking = hemat CPU/RAM per query
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

// ─── JWT Authentication ───────────────────────────────────────────
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? "AuraArchitecture-SuperSecretKey-2024-ChangeInProduction!";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "AuraApi",
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? "AuraFrontend",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// ─── Register services ────────────────────────────────────────────
builder.Services.AddScoped<AuthService>();

// ─── CORS ─────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "http://localhost:3001",
                "https://auraarchitecture.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// ─── Initialize Database ──────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AuraDbContext>();
    db.Database.EnsureCreated();  // Creates SQLite file + tables if they don't exist
    // WAL mode: read & write SQLite tidak saling blokir
    db.Database.ExecuteSqlRaw("PRAGMA journal_mode=WAL;");
    DatabaseSeeder.Seed(db);
}

// ─── Middleware (urutan penting untuk perf) ───────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseResponseCompression();
app.UseResponseCaching();
app.UseOutputCache();
// Static dengan cache 30 hari (gambar upload)
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.CacheControl = "public,max-age=2592000";
    }
});
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
