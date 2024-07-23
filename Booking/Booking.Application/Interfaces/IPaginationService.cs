using Booking.Application.Models.Pagination;

namespace Booking.Application.Interfaces;

public interface IPaginationService<EntityVmType, PaginationVmType> where PaginationVmType : PaginationFilterDto {
	Task<PageVm<EntityVmType>> GetPageAsync(PaginationVmType vm);
}