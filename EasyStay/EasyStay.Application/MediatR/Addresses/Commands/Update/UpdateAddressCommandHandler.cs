﻿using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.Addresses.Commands.Update;

public class UpdateAddressCommandHandler(
	IBookingDbContext context
) : IRequestHandler<UpdateAddressCommand> {

	public async Task Handle(UpdateAddressCommand request, CancellationToken cancellationToken) {
		var entity = await context.Addresses
			.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(Address), request.Id);

		entity.Street = request.Street;
		entity.HouseNumber = request.HouseNumber;
		entity.Floor = request.Floor;
		entity.ApartmentNumber = request.ApartmentNumber;
		entity.CityId = request.CityId;

		await context.SaveChangesAsync(cancellationToken);
	}
}