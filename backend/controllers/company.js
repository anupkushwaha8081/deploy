const Company = require("../models/Company");
const { isFileTypeSupported, uploadFileToCloudinary } = require('../utility/utils');



exports.registerCompany = async (req, res) => {
    try {
        const userId = req._id;
        const { companyName, description, website, location,  } = req.body; 

        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "Please fill the company name",
            });
        }

        const company = await Company.findOne({ companyName });
        if (company) {
            return res.status(200).json({
                success: true,
                message: "Another company already exists with the same name",
            });
        }
        console.log("i am request :",req.files);

       

        const newCompany = await Company.create({
            companyName,
            userId, // Ensure userId is stored
        });

        return res.status(200).json({
            success: true,
            newCompany,
            message: "Company registered successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error in registerCompany controller",
        });
    }
};


exports.getCompany = async (req, res) => {
    try {
        const userId = req._id;
        const companies = await Company.find({userId});
        if (!companies) {
            return res.status(404).json({
                success: false,
                message: "company not found "
            })
        }
        return res.status(200).json({
            success: true,
            companies,
            message: "i am company list"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "i am error from get company under company controller"
        })
        console.error(error);

    }
}



exports.getCompanyId = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "company profile not found"
            })
        }
        const companyObject = company.toObject();

        return res.status(200).json({
            success: true,
            company: companyObject,
            message: 'company profile found',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "i am error from get companyId under company controller"
        })
        console.error(error);

    }
}


exports.updateCompany = async (req, res) => {
    try {
      console.log("🔹 Raw Request Body:", req.body); // Debugging
      const { companyName, description, website, location } = req.body;
    


const logo =req.files.logo;
        const supportedTypes = ["jpg", "jpeg", "png"];
        const logotype = logo.name.split(".")[1].toLowerCase();
        console.log("File type:", logotype);
        if(!isFileTypeSupported(logotype, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported.",
            });
        }

        console.log("Uploading to Cloudinary...");
        const cloudResponse = await uploadFileToCloudinary(logo, "anup8081");





  
      if (!companyName) {
        return res.status(400).json({ success: false, message: "Company name is required" });
      }
  
      const updateData = { companyName, description, website, location,logo:cloudResponse.secure_url };
      console.log("✅ Parsed Data:", updateData); // Debugging
  
      const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
      if (!company) {
        return res.status(404).json({ success: false, message: "Company not found" });
      }
  
      return res.status(200).json({ success: true, company, message: "Company information updated" });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };



