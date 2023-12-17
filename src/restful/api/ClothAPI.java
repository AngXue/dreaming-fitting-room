package restful.api;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import restful.bean.Result;
import restful.database.EM;
import restful.entity.Cloth;

@Path("/cloth")
public class ClothAPI{

	@POST
    @Path("/add")
	@Consumes("application/json;charset=UTF-8")
    @Produces("application/json;charset=UTF-8")
    public Result addCloth(Cloth cloth) {
    	List<Cloth> result = EM.getEntityManager()
				.createNamedQuery("Cloth.findByClothID", Cloth.class)
				.setParameter("clothID", cloth.getClothID())
				.getResultList();
    	
    	if(result.isEmpty()) {
    		cloth.setId(0);
			cloth = EM.getEntityManager().merge(cloth);
			EM.getEntityManager().persist(cloth);
			EM.getEntityManager().getTransaction().commit();
			
			return new Result(0, "添加成功", cloth, "");
		}
       
        return new Result(-1, "服饰编号重复", cloth, "");
    }

    @POST
    @Path("/update")
    @Consumes("application/json;charset=UTF-8")
    @Produces("application/json;charset=UTF-8")
    public Result updateCloth(Cloth cloth) {        
        EM.getEntityManager().merge(cloth);
        EM.getEntityManager().getTransaction().commit();
        
        return new Result(0, "更新成功", "", "");
    }

    @POST
    @Path("/remove")
    @Consumes("application/json;charset=UTF-8")
    @Produces("application/json;charset=UTF-8")
    public Result removeCloth(Cloth cloth) {
        Cloth toRemove = EM.getEntityManager().createNamedQuery("Cloth.findByClothID", Cloth.class)
        		.setParameter("clothID", cloth.getClothID())
        		.getSingleResult();
        
        EM.getEntityManager().remove(toRemove);
        EM.getEntityManager().getTransaction().commit();
        
        return new Result(0, "删除成功", "", "");
    }

    @POST
    @Path("/search")
    @Consumes("application/json;charset=UTF-8")
    @Produces("application/json;charset=UTF-8")
    public Result searchCloth(Cloth cloth) {
        List<Cloth> clothes = EM.getEntityManager().createNamedQuery("Cloth.findByGenderAndCategory", Cloth.class)
                                .setParameter("clothGender", cloth.getClothGender())
                                .setParameter("clothCategoryName", cloth.getClothCategoryName())
                                .getResultList();
        
        return new Result(0, "查询成功", clothes, "");
    }
    
    @POST
    @Path("/getSingle")
	@Consumes("application/json;charset=UTF-8")
    @Produces("application/json;charset=UTF-8")
    public Result getSingleCloth(Cloth cloth) {
    	Cloth result = EM.getEntityManager()
				.createNamedQuery("Cloth.findByClothID", Cloth.class)
				.setParameter("clothID", cloth.getClothID())
				.getSingleResult();
       
        return new Result(0, "查询成功", result, "");
    }
    
    @POST  
    @Path("/uploadImage")  
    @Produces("application/json;charset=UTF-8") 
    public Result uploadImage(@Context HttpServletRequest request, @QueryParam("code") String suitCode) { 
        // code为服装编号
        // 创建DiskFileItem工厂  
    	DiskFileItemFactory factory = new DiskFileItemFactory();
        // 创建文件上传解析对象  
    	ServletFileUpload upload = new ServletFileUpload(factory);
        // 按照UTF-8编码格式读取
        upload.setHeaderEncoding("UTF-8");  
        // 设置每个文件最大为5M  
        upload.setFileSizeMax(5120*1024); // 5M
        // 一共最多能上传10M  
        upload.setSizeMax(10240*1024); // 10M
        // 获取文件保存目录  
        String savePath = "../../../../WebContent/images/data/suits/";

        try {  
            // 解析并保存  
            List<FileItem> fileItems = upload.parseRequest(request);
            for (FileItem fileItem : fileItems) {
                // 取原文件后缀和suitCode拼接成新文件名
                String fileName = fileItem.getName();
                fileName = suitCode + fileName.substring(fileName.lastIndexOf("."));
                // 保存文件
                fileItem.write(new File(savePath + fileName));
                // 返回结果
                return new Result(0, fileName, "", "");  
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
            return new Result(-1, "服务器文件解析错误", "", "");  
        }  

        return new Result(-1, "未发现可供服务保存的数据", "", "");  
    }  

}