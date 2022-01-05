using RockPaperScissor;
using FsCheck;
using FsCheck.Xunit;
using Xunit;
using System.Linq;
using System.Collections.Generic;

namespace Tests
{
    [Trait("Tournement", "Properties")]
    public class TournementTests
    {

        [Property(DisplayName = "max plays", Arbitrary = new[] { typeof(ResultsListGenerator) })]
        public Property Test(TourTestData data)
        {
            var tour = Tournament.New(data.Total);
            var winner = tour.Winner;
            var ctr = 0;
            foreach (var play in data.Plays.Take(data.Total))
            {
                tour = tour.Play(play);
                ctr++;
                winner = tour.Winner;
                if (winner != null)
                    break;
            }

            return (winner != null).ToProperty();
        }



    }

    public record TourTestData(int Total, IEnumerable<(RPS, RPS)> Plays);

    public static class ResultsListGenerator
    {
        public static Arbitrary<TourTestData> Generate()
        {
            var plays = from f in Arb.Generate<RPS>()
                        from s in Arb.Generate<RPS>()
                        where f != s
                        select (f, s);

            var lsts =
                from n in Gen.Choose(5, 10)
                from ps in Gen.ArrayOf(1000, plays)
                select new TourTestData(n, ps);

            return lsts.ToArbitrary();
        }
    }
}