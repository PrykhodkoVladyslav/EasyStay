using AutoMapper;
using EasyStay.Application.Common.Mappings;
using EasyStay.Application.MediatR.Addresses.Queries.Shared;
using EasyStay.Application.MediatR.HotelAmenities.Queries.Shared;
using EasyStay.Application.MediatR.HotelCategories.Queries.Shared;
using EasyStay.Domain;

namespace EasyStay.Application.MediatR.Hotels.Queries.Shared;

public class HotelVm : IMapWith<Hotel> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public TimeOnly ArrivalTimeUtcFrom { get; set; }
	public TimeOnly ArrivalTimeUtcTo { get; set; }

	public TimeOnly DepartureTimeUtcFrom { get; set; }
	public TimeOnly DepartureTimeUtcTo { get; set; }

	public decimal? MinPrice { get; set; }
	public decimal? MaxPrice { get; set; }

	public float Rating { get; set; }

	public bool IsArchived { get; set; }

	public AddressVm Address { get; set; } = null!;

	public HotelCategoryVm Category { get; set; } = null!;

	public long RealtorId { get; set; }
	public RealtorShortInfoVm Realtor { get; set; } = null!;

	public IEnumerable<HotelAmenityVm> HotelAmenities { get; set; } = null!;

	public IEnumerable<HotelPhotoVm> Photos { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<Hotel, HotelVm>()
			.ForMember(
				dest => dest.ArrivalTimeUtcFrom,
				opt => opt.MapFrom(src => TimeOnly.FromDateTime(src.ArrivalTimeUtcFrom.DateTime))
			)
			.ForMember(
				dest => dest.ArrivalTimeUtcTo,
				opt => opt.MapFrom(src => TimeOnly.FromDateTime(src.ArrivalTimeUtcTo.DateTime))
			)
			.ForMember(
				dest => dest.DepartureTimeUtcFrom,
				opt => opt.MapFrom(src => TimeOnly.FromDateTime(src.DepartureTimeUtcFrom.DateTime))
			)
			.ForMember(
				dest => dest.DepartureTimeUtcTo,
				opt => opt.MapFrom(src => TimeOnly.FromDateTime(src.DepartureTimeUtcTo.DateTime))
			)
			.ForMember(
				dest => dest.MinPrice,
				opt => opt.MapFrom(
					src => src.Rooms
						.SelectMany(r => r.RoomVariants)
						.Min(rv => (decimal?)(rv.DiscountPrice ?? rv.Price))
				)
			)
			.ForMember(
				dest => dest.MaxPrice,
				opt => opt.MapFrom(
					src => src.Rooms
						.SelectMany(r => r.RoomVariants)
						.Max(rv => (decimal?)(rv.DiscountPrice ?? rv.Price))
				)
			)
			// ToDo: Add a real rating when there are reviews
			.ForMember(dest => dest.Rating, opt => opt.MapFrom(src => 9.3F))
			.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.HotelCategory))
			.ForMember(
				dest => dest.HotelAmenities,
				opt => opt.MapFrom(
					src => src.HotelHotelAmenities
						.Select(hha => hha.HotelAmenity)
						.ToArray()
				)
			);
	}
}
