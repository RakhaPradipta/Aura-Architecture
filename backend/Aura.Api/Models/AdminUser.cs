namespace Aura.Api.Models;

public class AdminUser
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "Admin";
    public string DisplayName { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
}

public class CreateAdminUserRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = "Admin";
    public string DisplayName { get; set; } = string.Empty;
}

public class UpdateAdminUserRequest
{
    public string? Password { get; set; }
    public string? Role { get; set; }
    public string? DisplayName { get; set; }
    public bool? IsActive { get; set; }
}
