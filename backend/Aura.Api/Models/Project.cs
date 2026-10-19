namespace Aura.Api.Models;

public class Project
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Client { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string BeforeDescription { get; set; } = string.Empty;
    public string AfterDescription { get; set; } = string.Empty;
    public string DesignChallenge { get; set; } = string.Empty;
    public string DesignSolution { get; set; } = string.Empty;
    public List<string> Materials { get; set; } = new();
    public List<string> Features { get; set; } = new();
    public List<string> Tags { get; set; } = new();
    public List<ProjectStat> Stats { get; set; } = new();
    public List<string> TeamMembers { get; set; } = new();
    public ProjectTestimonial? Testimonial { get; set; }
    public string Image { get; set; } = string.Empty;
    public List<string> Images { get; set; } = new();
}
