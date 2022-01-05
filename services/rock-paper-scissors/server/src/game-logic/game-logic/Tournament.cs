namespace RockPaperScissor
{


    public record GameResult((RPS, RPS) Play, Winner Winner);

    public record TournamentState(
        int Total,
        int Current,
        IEnumerable<GameResult> Results,
        Winner? Winner);

    public static class Tournament
    {
        public static readonly TournamentState Empty = new(
            Total: 0,
            Current: 0,
            Results: Array.Empty<GameResult>(),
            Winner: null
        );

        public static TournamentState New(int total) =>
            Empty with { Total = total };

        public static TournamentState Play(this TournamentState state, (RPS, RPS) play)
        {
            if (state.Current == state.Total)
                return state;

            var playWinner = play.GetWinner();
            var result = new GameResult(play, playWinner);
            var results = state.Results.Append(result);
            var current = state.Current + 1;

            Winner? winner = null;
            if (current == state.Total)
            {
                winner = state.Results.Select(a => a.Winner).GetWinner();
            }

            return state with
            {
                Current = current,
                Results = results,
                Winner = winner
            };
        }


        static Winner GetWinner(this IEnumerable<Winner> winners)
        {
            var f = 0;
            var s = 0;
            
            foreach (var winner in winners)
            {
                switch (winner)
                {
                    case Winner.First:
                        f++;
                        break;
                    case Winner.Second:
                        s++;
                        break;
                }
            }

            if (f == s)
            {
                return Winner.Draw;
            }
            else if (f > s)
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
