using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Aura.Api.Data;
using Aura.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Aura.Api.Services;

public class AuthService
{
    private readonly IConfiguration _configuration;
    private readonly AuraDbContext _db;

    public AuthService(IConfiguration configuration, AuraDbContext db)
    {
        _configuration = configuration;
        _db = db;
    }

    public async Task<LoginResponse?> AuthenticateAsync(LoginRequest request)
    {
        var user = await _db.AdminUsers
            .FirstOrDefaultAsync(u => u.Username == request.Username && u.IsActive);

        if (user is null)
            return null;

        if (!VerifyPassword(request.Password, user.PasswordHash))
            return null;

        // Update last login time
        user.LastLoginAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return GenerateJwtToken(user.Username, user.Role);
    }

    public LoginResponse GenerateJwtToken(string username, string role)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key not configured")));

        var expires = DateTime.UtcNow.AddHours(
            double.Parse(_configuration["Jwt:ExpiresInHours"] ?? "24"));

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"] ?? "AuraApi",
            audience: _configuration["Jwt:Audience"] ?? "AuraFrontend",
            claims: claims,
            expires: expires,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new LoginResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Username = username,
            Role = role,
            ExpiresAt = expires
        };
    }

    public static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    public static bool VerifyPassword(string password, string hash)
    {
        return HashPassword(password) == hash;
    }
}
