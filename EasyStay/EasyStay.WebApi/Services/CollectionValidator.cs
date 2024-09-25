using EasyStay.Application.Interfaces;

namespace EasyStay.WebApi.Services;

public class CollectionValidator : ICollectionValidator {
	public bool IsDistinct<T>(IEnumerable<T> collaction) {
		HashSet<T> uniqueIds = [];

		foreach (var item in collaction) {
			if (!uniqueIds.Add(item))
				return false;
		}
		return true;
	}

	public bool IsNullPossibleDistinct<T>(IEnumerable<T>? collaction) {
		if (collaction is null)
			return true;

		return IsDistinct(collaction.Where(i => i is not null));
	}
}
