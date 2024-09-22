using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.Addresses.Commands.Delete;

public class DeleteAddressCommandHandler(
	IBookingDbContext context
) : IRequestHandler<DeleteAddressCommand> {

	public async Task Handle(DeleteAddressCommand request, CancellationToken cancellationToken) {
		var entity = await context.Addresses
			.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(Address), request.Id);

		context.Addresses.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);
	}
}