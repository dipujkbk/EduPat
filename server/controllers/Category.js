const Category = require("../models/Category");

//create Category kaa handler function

exports.createCategory = async (req, res)=>{

    try {
        
        //fetch data
        const {name, description} = req.body;
        //validation
        if(!name){
            return res.status(400).json({
                success: false,
                message: "All fields are required "
            })
        }

        //create entry in DB
        const CategoryDeatils = await Category.create({
            name: name,
            description: description
        });
        console.log("Category Details ", CategoryDeatils);

        return res.status(200).json({
            success: true,
            message: "Category created successfully "
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
};


//getAllCategory handler function
exports.showAllCategories = async(req, res)=>{
    try {

        const allCategories = await Category.find({}, {name: true, description: true}); //makesure name and description present ,but here no need
        res.status(200).json({
            success: true,
            message: "All Categories returned successfully",
            allCategories,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

//category page details

exports.categoryPageDetails = async(req, res) =>{

    try {
        const { categoryId } = req.body;

		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec();
		console.log(selectedCategory);
		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		const selectedCourses = selectedCategory.courses;

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate("courses");

        /*differentCourses.push(...category.courses);: 
        Inside the loop, it extracts the courses property from the current category object and spreads its elements into the differentCourses array. 
        ...category.courses: The spread operator (...) is used here to "spread out" or "unpack" the elements of the category.courses array.
        This means it takes each element of the category.courses array and adds them individually to the differentCourses array. */

		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}
        

        // Get top-selling courses across all categories

        /*const allCourses = allCategories.flatMap((category) => category.courses);: 
        After fetching all categories and populating their "courses," this line of code flattens the nested structure to create a flat array of all courses from all categories.

        allCategories is an array of category objects, each of which has a "courses" property that is itself an array of course objects.
        .flatMap() is used to map and concatenate the "courses" arrays from each category into a single array, resulting in allCourses containing all the course documents from all categories. */
		
        const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses); //cobinging all courses into one array
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold) ///TODO-->sold property nehi he
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
        
    }
}
