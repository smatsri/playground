namespace RockPaperScissor
{
    public enum RPS : int
    {
        Rock = 1,
        Paper = 2,
        Scissor = 3
    }

    public enum Winner
    {
        First,
        Second,
        Draw
    }

    public static class RPSExt
    {

        public static RPS Add(this RPS first, RPS second)
        {
            const RPS r = RPS.Rock;
            const RPS p = RPS.Paper;
            const RPS s = RPS.Scissor;

            var (a, b) = Sort(first, second);

            return (a, b) switch
            {
                (r, p) => p,
                (r, s) => r,
                (p, s) => s,
                _ => a,
            };

            static (RPS a, RPS b) Sort(RPS first, RPS second)
            {
                var arr = new RPS[] { first, second }.OrderBy(a => a).ToArray();

                var a = arr[0];
                var b = arr[1];
                return (a, b);
            }
        }

        public static Winner GetWinner(this (RPS, RPS) play)
        {
            var (f, s) = play;
            var n = f.Add(s);
            return GetWinner(f, s, n);

            static Winner GetWinner(RPS f, RPS s, RPS n)
            {
                if (n == f && n == s)
                {
                    return Winner.Draw;
                }
                else if (n == f)
                {
                    return Winner.First;
                }
                else
                {
                    return Winner.Second;
                }
            }

        }

    }

}