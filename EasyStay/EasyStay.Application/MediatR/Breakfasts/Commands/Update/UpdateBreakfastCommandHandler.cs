using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.Breakfasts.Commands.Update;

public class UpdateBreakfastCommandHandler(
	IBookingDbContext context
) : IRequestHandler<UpdateBreakfastCommand> {

	public async Task Handle(UpdateBreakfastCommand request, CancellationToken cancellationToken) {
		var entity = await context.Breakfasts.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(Breakfast), request.Id);

		entity.Name = request.Name;
		await context.SaveChangesAsync(cancellationToken);
	}
}
