using Aura.Api.Data;
using Aura.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AuraDbContext _db;

    public ProjectsController(AuraDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<ApiResponse<List<Project>>>> GetAll()
    {
        var projects = await _db.Projects.AsNoTracking().ToListAsync();
        return Ok(ApiResponse<List<Project>>.Ok(projects));
    }

    [HttpGet("{id}")]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<ApiResponse<Project>>> GetById(string id)
    {
        var project = await _db.Projects.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        if (project is null)
            return NotFound(ApiResponse<Project>.Fail("Project not found."));

        return Ok(ApiResponse<Project>.Ok(project));
    }

    [HttpGet("by-category/{category}")]
    [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<ApiResponse<List<Project>>>> GetByCategory(string category)
    {
        var projects = await _db.Projects
            .AsNoTracking()
            .Where(p => p.Category == category)
            .ToListAsync();

        return Ok(ApiResponse<List<Project>>.Ok(projects));
    }

    // ─── Write operations (require authentication) ──────────────────

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<Project>>> Create([FromBody] CreateProjectRequest request)
    {
        if (await _db.Projects.AnyAsync(p => p.Id == request.Id))
            return Conflict(ApiResponse<Project>.Fail($"A project with ID '{request.Id}' already exists."));

        var project = request.ToProject();
        _db.Projects.Add(project);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = project.Id },
            ApiResponse<Project>.Ok(project, "Project created successfully."));
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<Project>>> Update(string id, [FromBody] CreateProjectRequest request)
    {
        var project = await _db.Projects.FindAsync(id);
        if (project is null)
            return NotFound(ApiResponse<Project>.Fail("Project not found."));

        // Update all fields
        project.Title = request.Title;
        project.Category = request.Category;
        project.Year = request.Year;
        project.Location = request.Location;
        project.Client = request.Client;
        project.Area = request.Area;
        project.Description = request.Description;
        project.BeforeDescription = request.BeforeDescription;
        project.AfterDescription = request.AfterDescription;
        project.DesignChallenge = request.DesignChallenge;
        project.DesignSolution = request.DesignSolution;
        project.Materials = request.Materials;
        project.Features = request.Features;
        project.Tags = request.Tags;
        project.Stats = request.Stats;
        project.TeamMembers = request.TeamMembers;
        project.Testimonial = request.Testimonial;
        project.Image = request.Image;
        project.Images = request.Images;

        await _db.SaveChangesAsync();

        return Ok(ApiResponse<Project>.Ok(project, "Project updated successfully."));
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(string id)
    {
        var project = await _db.Projects.FindAsync(id);
        if (project is null)
            return NotFound(ApiResponse<object>.Fail("Project not found."));

        _db.Projects.Remove(project);
        await _db.SaveChangesAsync();

        return Ok(ApiResponse<object>.Ok(new { }, "Project deleted successfully."));
    }
}
