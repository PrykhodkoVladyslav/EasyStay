using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.RentalPeriods.Commands.Delete;

public class DeleteRentalPeriodCommandHandler(
	IBookingDbContext context
) : IRequestHandler<DeleteRentalPeriodCommand> {

	public async Task Handle(DeleteRentalPeriodCommand request, CancellationToken cancellationToken) {
		var entity = await context.RentalPeriods.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(RentalPeriod), request.Id);

		context.RentalPeriods.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);
	}
}
