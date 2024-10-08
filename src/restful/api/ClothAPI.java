package restful.api;

import java.io.File;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import restful.bean.Result;
import restful.database.EM;
import restful.entity.Cloth;

@Path("/cloth")
public class ClothAPI{
	
	@Context
	private ServletContext context;

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
    @Path("/uploadClothImage")
    @Produces("application/json;charset=UTF-8") 
    public Result uploadImage(@Context HttpServletRequest request) {
        // 文件上传设置
    	String realPath = context.getRealPath("/");
        String UPLOAD_DIRECTORY = realPath + "images/data/suits/";
        int MAX_FILE_SIZE = 5120 * 1024; // 5MB
        int MAX_REQUEST_SIZE = 10240 * 1024; // 10MB
        String fileName = null;
        String id = null;

        DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);

        upload.setFileSizeMax(MAX_FILE_SIZE);
        upload.setSizeMax(MAX_REQUEST_SIZE);
        upload.setHeaderEncoding("UTF-8");

        try {
            List<FileItem> formItems = upload.parseRequest(request);
            FileItem imageFileItem = null;

            for (FileItem item : formItems) {
                if (item.isFormField() && "id".equals(item.getFieldName())) {
                    id = item.getString("UTF-8");
                    System.out.println("id = : " + id);
                } else if (!item.isFormField()) {
                    imageFileItem = item;
                }
            }

            if (imageFileItem != null && id != null && !id.isEmpty()) {
            	fileName = new File(imageFileItem.getName()).getName();
                String filePath = UPLOAD_DIRECTORY + fileName;

                // 如果文件已存在，删除旧文件
                File oldFile = new File(filePath);
                if (oldFile.exists()) {
                    oldFile.delete();
                }
                
                // 保存文件
                File storeFile = new File(filePath);
                imageFileItem.write(storeFile);

                return new Result(0, "上传成功", fileName, ""); 
            } else {
            	return new Result(-1, "缺少必要的参数或文件", "", "");  
            }
        } catch (Exception ex) {
        	System.out.println(ex.getMessage());
        	return new Result(0, "上传成功", fileName, ""); 
        }
    }

}