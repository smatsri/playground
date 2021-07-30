using Microsoft.EntityFrameworkCore;

namespace OnlineXO.GameManagment.Data
{
	using Domain;
	using System.Diagnostics.CodeAnalysis;

	public class GameManagmentDb : DbContext
	{
		public GameManagmentDb([NotNull] DbContextOptions options) : base(options)
		{
		}

		public DbSet<Room> Rooms { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			var player = modelBuilder.Entity<Player>();
			player.Property(a => a.Username).HasMaxLength(20);
			player.HasKey(a => a.Username);
		}
	}
}
