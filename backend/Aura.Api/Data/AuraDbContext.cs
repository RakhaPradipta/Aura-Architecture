using System.Text.Json;
using Aura.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Aura.Api.Data;

public class AuraDbContext : DbContext
{
    private static readonly ValueComparer<List<string>> StringListComparer =
        new((a, b) => (a ?? new()).SequenceEqual(b ?? new()),
            v => v == null ? 0 : v.Aggregate(0, (h, s) => HashCode.Combine(h, s.GetHashCode())),
            v => v == null ? new List<string>() : v.ToList());

    private static readonly ValueComparer<List<ProjectStat>> StatListComparer =
        new((a, b) => JsonSerializer.Serialize(a, (JsonSerializerOptions?)null) == JsonSerializer.Serialize(b, (JsonSerializerOptions?)null),
            v => v == null ? 0 : JsonSerializer.Serialize(v, (JsonSerializerOptions?)null).GetHashCode(),
            v => v == null ? new List<ProjectStat>() : v.Select(s => new ProjectStat { Label = s.Label, Value = s.Value }).ToList());

    public AuraDbContext(DbContextOptions<AuraDbContext> options) : base(options) { }

    public DbSet<Project> Projects => Set<Project>();
    public DbSet<TeamMember> TeamMembers => Set<TeamMember>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ─── Project ─────────────────────────────────────────────
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Id).HasMaxLength(100);
            entity.Property(p => p.Title).HasMaxLength(200);
            entity.Property(p => p.Category).HasMaxLength(50);
            entity.Property(p => p.Year).HasMaxLength(10);
            entity.Property(p => p.Location).HasMaxLength(200);
            entity.Property(p => p.Client).HasMaxLength(200);
            entity.Property(p => p.Area).HasMaxLength(50);
            entity.Property(p => p.Image).HasMaxLength(500);

            // Index kolom filter utama — by-category tanpa full scan
            entity.HasIndex(p => p.Category);
            entity.HasIndex(p => p.Year);

            // Store lists as JSON strings (+ ValueComparer: hilangkan warning EF10620)
            entity.Property(p => p.Materials).HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new())
                .Metadata.SetValueComparer(StringListComparer);
            entity.Property(p => p.Features).HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new())
                .Metadata.SetValueComparer(StringListComparer);
            entity.Property(p => p.Tags).HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new())
                .Metadata.SetValueComparer(StringListComparer);
            entity.Property(p => p.TeamMembers).HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new())
                .Metadata.SetValueComparer(StringListComparer);
            entity.Property(p => p.Images).HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new())
                .Metadata.SetValueComparer(StringListComparer);

            // Store Stats as JSON
            entity.Property(p => p.Stats).HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<ProjectStat>>(v, (JsonSerializerOptions?)null) ?? new())
                .Metadata.SetValueComparer(StatListComparer);

            // Store Testimonial as JSON (nullable)
            entity.Property(p => p.Testimonial).HasConversion(
                v => v != null ? JsonSerializer.Serialize(v, (JsonSerializerOptions?)null) : null,
                v => v != null ? JsonSerializer.Deserialize<ProjectTestimonial>(v, (JsonSerializerOptions?)null) : null);

            entity.Property(p => p.Description).HasColumnType("TEXT");
            entity.Property(p => p.BeforeDescription).HasColumnType("TEXT");
            entity.Property(p => p.AfterDescription).HasColumnType("TEXT");
            entity.Property(p => p.DesignChallenge).HasColumnType("TEXT");
            entity.Property(p => p.DesignSolution).HasColumnType("TEXT");
        });

        // ─── TeamMember ──────────────────────────────────────────
        modelBuilder.Entity<TeamMember>(entity =>
        {
            entity.HasKey(m => m.Slug);
            entity.Property(m => m.Slug).HasMaxLength(100);
            entity.Property(m => m.Name).HasMaxLength(200);
            entity.Property(m => m.Role).HasMaxLength(200);
            entity.Property(m => m.Bias).HasMaxLength(200);
            entity.Property(m => m.Image).HasMaxLength(500);
            entity.Property(m => m.Education).HasMaxLength(300);
            entity.Property(m => m.Experience).HasMaxLength(50);

            // Store lists as JSON
            entity.Property(m => m.NotableProjects).HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new())
                .Metadata.SetValueComparer(StringListComparer);

            // Store SocialLinks as JSON
            entity.Property(m => m.Social).HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<SocialLinks>(v, (JsonSerializerOptions?)null) ?? new());

            entity.Property(m => m.BiasDescription).HasColumnType("TEXT");
            entity.Property(m => m.Bio).HasColumnType("TEXT");
        });

        // ─── AdminUser ──────────────────────────────────────────
        modelBuilder.Entity<AdminUser>(entity =>
        {
            entity.HasKey(a => a.Id);
            entity.HasIndex(a => a.Username).IsUnique();
            entity.Property(a => a.Username).HasMaxLength(100);
            entity.Property(a => a.PasswordHash).HasMaxLength(200);
            entity.Property(a => a.Role).HasMaxLength(50);
            entity.Property(a => a.DisplayName).HasMaxLength(200);
        });
    }
}
