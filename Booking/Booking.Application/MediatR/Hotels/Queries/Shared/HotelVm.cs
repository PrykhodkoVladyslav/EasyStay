using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Application.MediatR.Addresses.Queries.Shared;
using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using Booking.Domain;

namespace Booking.Application.MediatR.Hotels.Queries.Shared;

public class HotelVm : IMapWith<Hotel> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public double Rating { get; set; }

	public int Reviews { get; set; }

	public long UserId { get; set; }

	public AddressVm Address { get; set; } = null!;

	public HotelTypeVm Type { get; set; } = null!;

	public IEnumerable<HotelPhotoVm> Photos { get; set; } = null!;


	public void Mapping(Profile profile) {
		profile.CreateMap<Hotel, HotelVm>();
		// .ForMember(
		// 	h => h.Rating,
		// 	opt => opt.MapFrom(
		// 		h => h.Rooms
		// 			.SelectMany(
		// 				r => r.Bookings.SelectMany(b => b.Reviews)
		// 			)
		// 			.Average(r => r.Score)
		// 			.GetValueOrDefault(0)
		// 	)
		// )
		// .ForMember(
		// 	h => h.Reviews,
		// 	opt => opt.MapFrom(
		// 		h => h.Rooms
		// 			.SelectMany(
		// 				r => r.Bookings.SelectMany(b => b.Reviews)
		// 			)
		// 			.Count()
		// 	)
		// );
	}
}