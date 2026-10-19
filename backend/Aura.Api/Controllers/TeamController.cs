using Aura.Api.Data;
using Aura.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly AuraDbContext _db;

    public TeamController(AuraDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<ApiResponse<List<TeamMember>>>> GetAll()
    {
        var members = await _db.TeamMembers.AsNoTracking().ToListAsync();
        return Ok(ApiResponse<List<TeamMember>>.Ok(members));
    }

    [HttpGet("{slug}")]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<ApiResponse<TeamMember>>> GetBySlug(string slug)
    {
        var member = await _db.TeamMembers.AsNoTracking().FirstOrDefaultAsync(m => m.Slug == slug);
        if (member is null)
            return NotFound(ApiResponse<TeamMember>.Fail("Team member not found."));

        return Ok(ApiResponse<TeamMember>.Ok(member));
    }

    // ─── Write operations (require authentication) ──────────────────

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<TeamMember>>> Create([FromBody] CreateTeamMemberRequest request)
    {
        if (await _db.TeamMembers.AnyAsync(m => m.Slug == request.Slug))
            return Conflict(ApiResponse<TeamMember>.Fail($"A team member with slug '{request.Slug}' already exists."));

        var member = request.ToTeamMember();
        _db.TeamMembers.Add(member);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBySlug), new { slug = member.Slug },
            ApiResponse<TeamMember>.Ok(member, "Team member created successfully."));
    }

    [Authorize]
    [HttpPut("{slug}")]
    public async Task<ActionResult<ApiResponse<TeamMember>>> Update(string slug, [FromBody] CreateTeamMemberRequest request)
    {
        var member = await _db.TeamMembers.FindAsync(slug);
        if (member is null)
            return NotFound(ApiResponse<TeamMember>.Fail("Team member not found."));

        // Update all fields
        member.Name = request.Name;
        member.Role = request.Role;
        member.Bias = request.Bias;
        member.BiasDescription = request.BiasDescription;
        member.Bio = request.Bio;
        member.Education = request.Education;
        member.Experience = request.Experience;
        member.NotableProjects = request.NotableProjects;
        member.Image = request.Image;
        member.Social = request.Social;

        await _db.SaveChangesAsync();

        return Ok(ApiResponse<TeamMember>.Ok(member, "Team member updated successfully."));
    }

    [Authorize]
    [HttpDelete("{slug}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(string slug)
    {
        var member = await _db.TeamMembers.FindAsync(slug);
        if (member is null)
            return NotFound(ApiResponse<object>.Fail("Team member not found."));

        _db.TeamMembers.Remove(member);
        await _db.SaveChangesAsync();

        return Ok(ApiResponse<object>.Ok(new { }, "Team member deleted successfully."));
    }
}
