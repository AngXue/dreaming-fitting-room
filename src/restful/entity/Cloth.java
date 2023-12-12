package restful.entity;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "T_Cloth")
@NamedQueries({
    @NamedQuery(name = "Cloth.findByClothID", query = "SELECT c FROM Cloth c WHERE c.clothID = :clothID"),
    @NamedQuery(name = "Cloth.findByClothName", query = "SELECT c FROM Cloth c WHERE c.clothName = :clothName"),
    @NamedQuery(name = "Cloth.findByGenderAndCategory", query = "SELECT c FROM Cloth c WHERE "
    		+ "c.clothGender = :clothGender AND c.clothCategoryName = :clothCategoryName")
})
public class Cloth extends IdEntity {

    private String clothID;
    private String clothName;
    private double clothPrice;
    private String clothGender;
    private String clothCategoryName;
    private String clothImagePath;
    
	public String getClothID() {
		return clothID;
	}
	
	public void setClothID(String clothID) {
		this.clothID = clothID;
	}
	
	public String getClothName() {
		return clothName;
	}
	
	public void setClothName(String clothName) {
		this.clothName = clothName;
	}
	
	public double getClothPrice() {
		return clothPrice;
	}
	
	public void setClothPrice(double clothPrice) {
		this.clothPrice = clothPrice;
	}
	
	public String getClothGender() {
		return clothGender;
	}
	
	public void setClothGender(String clothGender) {
		this.clothGender = clothGender;
	}
	
	public String getClothCategoryName() {
		return clothCategoryName;
	}
	
	public void setClothCategoryName(String clothCategoryName) {
		this.clothCategoryName = clothCategoryName;
	}
	
	public String getClothImagePath() {
		return clothImagePath;
	}
	
	public void setClothImagePath(String clothImagePath) {
		this.clothImagePath = clothImagePath;
	}

    
}
