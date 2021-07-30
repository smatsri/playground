using FluentValidation;

namespace OnlineXO.GameManagment.Validations
{
	public class CreateRoomValidator : AbstractValidator<Models.CreateRoomModel>
	{
		public CreateRoomValidator()
		{
			RuleFor(a => a.Name).NotEmpty();
		}
	}
}
