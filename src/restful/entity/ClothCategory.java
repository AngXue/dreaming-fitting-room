package restful.entity;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "T_ClothCategory")
@NamedQueries({
	@NamedQuery(name = "ClothCategory.findAll", query = "SELECT c FROM ClothCategory c"),
	@NamedQuery(name = "ClothCategory.findAllByIDAndName", 
	query = "SELECT c FROM ClothCategory c WHERE c.clothCategoryID = " 
	+ ":clothCategoryID AND c.clothCategoryName = :clothCategoryName")
})
public class ClothCategory extends IdEntity{

    private String clothCategoryID;
    private String clothCategoryName;
    
	public String getClothCategoryID() {
		return clothCategoryID;
	}
	
	public void setClothCategoryID(String clothCategoryID) {
		this.clothCategoryID = clothCategoryID;
	}
	
	public String getClothCategoryName() {
		return clothCategoryName;
	}
	
	public void setClothCategoryName(String clothCategoryName) {
		this.clothCategoryName = clothCategoryName;
	}


}
