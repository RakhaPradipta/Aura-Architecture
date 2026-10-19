using Aura.Api.Data;
using Aura.Api.Models;
using Aura.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = "Admin")]
public class AdminUserController : ControllerBase
{
    private readonly AuraDbContext _db;

    public AdminUserController(AuraDbContext db)
    {
        _db = db;
    }

    // ─── List all admin users ────────────────────────────────────
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<AdminUserResponse>>>> GetAll()
    {
        var users = await _db.AdminUsers
            .Select(u => new AdminUserResponse
            {
                Id = u.Id,
                Username = u.Username,
                Role = u.Role,
                DisplayName = u.DisplayName,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt,
                LastLoginAt = u.LastLoginAt
            })
            .ToListAsync();

        return Ok(ApiResponse<List<AdminUserResponse>>.Ok(users));
    }

    // ─── Get admin user by ID ────────────────────────────────────
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<AdminUserResponse>>> GetById(int id)
    {
        var user = await _db.AdminUsers.FindAsync(id);
        if (user is null)
            return NotFound(ApiResponse<AdminUserResponse>.Fail("User not found."));

        return Ok(ApiResponse<AdminUserResponse>.Ok(ToResponse(user)));
    }

    // ─── Create new admin user ───────────────────────────────────
    [HttpPost]
    public async Task<ActionResult<ApiResponse<AdminUserResponse>>> Create([FromBody] CreateAdminUserRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(ApiResponse<AdminUserResponse>.Fail("Username and password are required."));

        if (await _db.AdminUsers.AnyAsync(u => u.Username == request.Username))
            return Conflict(ApiResponse<AdminUserResponse>.Fail($"Username '{request.Username}' already exists."));

        var user = new AdminUser
        {
            Username = request.Username,
            PasswordHash = AuthService.HashPassword(request.Password),
            Role = request.Role,
            DisplayName = request.DisplayName,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _db.AdminUsers.Add(user);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = user.Id },
            ApiResponse<AdminUserResponse>.Ok(ToResponse(user), "User created successfully."));
    }

    // ─── Update admin user ───────────────────────────────────────
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<AdminUserResponse>>> Update(int id, [FromBody] UpdateAdminUserRequest request)
    {
        var user = await _db.AdminUsers.FindAsync(id);
        if (user is null)
            return NotFound(ApiResponse<AdminUserResponse>.Fail("User not found."));

        if (request.Password is not null)
            user.PasswordHash = AuthService.HashPassword(request.Password);

        if (request.Role is not null)
            user.Role = request.Role;

        if (request.DisplayName is not null)
            user.DisplayName = request.DisplayName;

        if (request.IsActive.HasValue)
            user.IsActive = request.IsActive.Value;

        await _db.SaveChangesAsync();

        return Ok(ApiResponse<AdminUserResponse>.Ok(ToResponse(user), "User updated successfully."));
    }

    // ─── Delete admin user ───────────────────────────────────────
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        var user = await _db.AdminUsers.FindAsync(id);
        if (user is null)
            return NotFound(ApiResponse<object>.Fail("User not found."));

        // Prevent deleting yourself
        var currentUsername = User.Identity?.Name;
        if (user.Username == currentUsername)
            return BadRequest(ApiResponse<object>.Fail("You cannot delete your own account."));

        _db.AdminUsers.Remove(user);
        await _db.SaveChangesAsync();

        return Ok(ApiResponse<object>.Ok(new { }, "User deleted successfully."));
    }

    // ─── Helper ──────────────────────────────────────────────────
    private static AdminUserResponse ToResponse(AdminUser user)
    {
        return new AdminUserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Role = user.Role,
            DisplayName = user.DisplayName,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt
        };
    }
}

public class AdminUserResponse
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
}
