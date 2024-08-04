using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.HotelCategories.Queries.GetAll;

public class GetAllHotelCategoriesQuery : IRequest<IEnumerable<HotelCategoryVm>> { }
