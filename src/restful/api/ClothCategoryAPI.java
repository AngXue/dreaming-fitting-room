package restful.api;

import java.util.List;

import javax.persistence.NoResultException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import restful.bean.Result;
import restful.database.EM;
import restful.entity.ClothCategory;
import restful.entity.User;

@Path("/clothCategory")
public class ClothCategoryAPI {
	
	@POST
	@Path("/add")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result addClothCategory(ClothCategory clothCategory) {
	    List<ClothCategory> result = EM.getEntityManager()
	            .createNamedQuery("ClothCategory.findAllByIDAndName", ClothCategory.class)
	            .setParameter("clothCategoryID", clothCategory.getClothCategoryID())
	            .setParameter("clothCategoryName", clothCategory.getClothCategoryName())
	            .getResultList();

	    if (result.isEmpty()) {
	    	clothCategory.setId(0);
	    	clothCategory = EM.getEntityManager().merge(clothCategory);
	        EM.getEntityManager().persist(clothCategory);
	        EM.getEntityManager().getTransaction().commit();

	        return new Result(0, "添加成功", clothCategory, "");
	    }

	    return new Result(-1, "编号或服饰名重复", "", "");
	}

	@POST
	@Path("/remove")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result removeClothCategory(ClothCategory clothCategory) {
	    ClothCategory result = EM.getEntityManager()
	    		.createNamedQuery("ClothCategory.findAllByIDAndName", ClothCategory.class)
	            .setParameter("clothCategoryID", clothCategory.getClothCategoryID())
	            .setParameter("clothCategoryName", clothCategory.getClothCategoryName())
	            .getSingleResult();
	    
	    EM.getEntityManager().remove(result);
	    EM.getEntityManager().getTransaction().commit();
	    
	    return new Result(0, "删除成功", "", "");
	}
	
	@POST
	@Path("/update")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result updateClothCategory(ClothCategory clothCategory) {
	    EM.getEntityManager().persist(EM.getEntityManager().merge(clothCategory));
	    EM.getEntityManager().getTransaction().commit();
	    
	    return new Result(0, "更新成功", "", "");
	}
	
	@POST
	@Path("/getSingleClothCategory")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result getSingleClothCategory(ClothCategory clothCategory) {
		ClothCategory result = EM.getEntityManager()
			.createNamedQuery("ClothCategory.findByClothCategoryID", ClothCategory.class)
			.setParameter("clothCategoryID", clothCategory.getClothCategoryID())
			.getSingleResult();

		return new Result(0, "获取成功", result, "");
	}

	
	@POST
	@Path("/getAll")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result getClothCategory() {
	    List<ClothCategory> result = EM.getEntityManager()
	            .createNamedQuery("ClothCategory.findAll", ClothCategory.class)
	            .getResultList();

	    return new Result(0, "获取成功", result, "");
	}
	
}
