inquirer
        .prompt([
            {
                type:"list",
                name:"ems_suite",
                message: "What would you like to do?",
                choices: ["View All Employees", "Add Employee","Update Employee Role", "View All Roles", "Add Roles", "View All Departments", "Add Department","Quit"]
            },
            {
                name:"view_employees",
                //Show employee's table
            },
            {
                type:"input",
                name:"add_employee",
                message:"What is the employee's first name?",
                message:"What is the employee's last name?",
                message:"What is the employee's role?",
                message:"What is the employee's manager?"
                //Show "Added [first,last name] to database"
            },
            {
                type:"input",
                name:"update_employee_role",
                message:"Which employee's role do you want to update?",
                message:"Which role do you want to assign?"
                //Show "Updated employee's role"
            },
            {
                name:"view_roles",
                //Show roles table
            },
            {
                type:"input",
                name:"add_roles",
                message:"What is the name of the role?",
                message:"What is the salary of the role?",
                message:"What department does this role belong to?"
                //If success, show "Added [role] to the database"
            },
            {
                name:"view_departments",
                //Show department table
            },
            {
                type:"input",
                name:"add_department",
                message:"What is the name of the department?"
                //If success, show "Added [name] to the database"
            },
            {
                name:"quit_application",
                //Exit application
            }
        ])