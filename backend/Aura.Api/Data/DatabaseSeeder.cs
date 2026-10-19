using Aura.Api.Models;
using Aura.Api.Services;

namespace Aura.Api.Data;

public static class DatabaseSeeder
{
    public static void Seed(AuraDbContext db)
    {
        // Seed admin users if none exist
        if (!db.AdminUsers.Any())
        {
            Console.WriteLine("Seeding admin users...");

            db.AdminUsers.AddRange(
                new AdminUser
                {
                    Username = "admin",
                    PasswordHash = AuthService.HashPassword("admin123"),
                    Role = "Admin",
                    DisplayName = "Administrator",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new AdminUser
                {
                    Username = "editor",
                    PasswordHash = AuthService.HashPassword("editor123"),
                    Role = "Editor",
                    DisplayName = "Editor",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                }
            );
        }

        // Seed projects if none exist
        if (!db.Projects.Any())
        {
            Console.WriteLine("Seeding projects...");
            db.Projects.AddRange(SeedData.Projects);
        }

        // Seed team members if none exist
        if (!db.TeamMembers.Any())
        {
            Console.WriteLine("Seeding team members...");
            db.TeamMembers.AddRange(SeedData.TeamMembers);
        }

        db.SaveChanges();
        Console.WriteLine("Database seeding complete.");
    }
}
