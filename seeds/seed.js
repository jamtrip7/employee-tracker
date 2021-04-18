const sequelize = require('../config/connection');
const { Employee, Department, Role } = require('../models');

const roleSeedData = require('./roleSeedData.json');
const departmentSeedData = require('./departmentSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const role = await Role.bulkCreate(roleSeedData);

  const department = await Department.bulkCreate(departmentSeedData);

  // Create roles
  for (let i = 0; i < 10; i++) {
    // Get a role's `id`
    const { id: RoleId } = role[
      Math.floor(Math.random() * role.length)
    ];

    // Get a department's `id`
    const { id: DepartmentId } = department[
      Math.floor(Math.random() * department.length)
    ];

    // Create a new employee with `first_name` and `last_name` values, but with ids selected above
    await employee.create({
      first_name: (Math.random() * 10000 + 1000).toFixed(2),
      last_name: Math.floor(Math.random() * 10) + 1,
      role_id: RoleId,
      manager_id: DepartmentId,
    }).catch((err) => {
      // If there's an error, such as the same random pairing of `role.id` and `department.id` occurring and we get a constraint error, don't quit the Node process
      console.log(err);
    });
  }

  process.exit(0);
};

seedDatabase();
