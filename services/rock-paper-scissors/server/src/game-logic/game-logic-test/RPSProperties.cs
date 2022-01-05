using RockPaperScissor;
using FsCheck;
using FsCheck.Xunit;
using Xunit;

namespace Tests
{
    [Trait("RPS", "Properties")]
    public class RPSProperties
    {
       
        [Property(DisplayName = "order should not matter")]
        public Property Order_Should_Not_Matter(RPS first, RPS second)
        {
            var x1 = first.Add(second);
            var x2 = second.Add(first);

            return (x1 == x2).ToProperty();
        }


        [Property(DisplayName = "adding with self")]
        public Property Adding_With_Self(RPS a)
        {
            return (a.Add(a) == a).ToProperty();
        }
    }
}