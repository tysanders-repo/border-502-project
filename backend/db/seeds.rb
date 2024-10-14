Member.create!(
  uin: 123456789,
  first_name: "EWB",
  last_name: "President",
  role: "president",
  major: "Civil Engineering",
  year: 2024,
  email: "ewbapppresident@gmail.com",
  phone: 1234567890,
  tshirt_size: "M",
  paid_dues: true,
  join_date: DateTime.now - 2.years,
  aggie_ring_day: DateTime.now + 6.months,
  birthday: DateTime.new(2000, 5, 1),
  graduation_day: DateTime.new(2024, 5, 15),
  archived: false,
  accepted: true,
  accomplishments: { "leadership" => "Organized major event", "awards" => "Outstanding Leadership 2023" }
)

Member.create!(
  uin: 987654321,
  first_name: "EWB",
  last_name: "Treasurer",
  role: "treasurer",
  major: "Accounting",
  year: 2024,
  email: "ewbapptreasurer@gmail.com",
  phone: 9876543210,
  tshirt_size: "L",
  paid_dues: true,
  join_date: DateTime.now - 1.years,
  aggie_ring_day: DateTime.now + 6.months,
  birthday: DateTime.new(2001, 8, 20),
  graduation_day: DateTime.new(2024, 5, 15),
  archived: false,
  accepted: true,
  accomplishments: { "leadership" => "Managed financial reports", "awards" => "Financial Excellence 2023" }
)

Member.create!(
  uin: 112233445,
  first_name: "EWB",
  last_name: "Ir",
  role: "internal relations",
  major: "Marketing",
  year: 2024,
  email: "ewbappir@gmail.com",
  phone: 1122334455,
  tshirt_size: "S",
  paid_dues: true,
  join_date: DateTime.now - 3.years,
  aggie_ring_day: DateTime.now + 6.months,
  birthday: DateTime.new(1999, 11, 12),
  graduation_day: DateTime.new(2024, 5, 15),
  archived: false,
  accepted: true,
  accomplishments: { "leadership" => "Led communication campaigns", "awards" => "Excellence in Communication 2023" }
)


Member.create!(
  uin: 210398210,
  first_name: "Jane",
  last_name: "Smith Jr",
  role: "member",
  major: "Computer Engineering",
  year: 2023,
  email: "jane.smith2@example.com",
  phone: "555-555",
  tshirt_size: "S",
  paid_dues: true,
  join_date: DateTime.now - 3.years,
  aggie_ring_day: DateTime.now + 3.months,
  birthday: DateTime.new(2001, 8, 25),
  graduation_day: DateTime.new(2023, 5, 15),
  archived: false,
  accepted: true,
  accomplishments: { "projects" => "Led robotics project", "awards" => "Vice President Excellence Award" }
)

Member.create!(
  uin: 210398211,
  first_name: "John",
  last_name: "Doe",
  role: "member",
  major: "Electrical Engineering",
  year: 2024,
  email: "john.doe2@example.com",
  phone: "555-1234",
  tshirt_size: "M",
  paid_dues: false,
  join_date: DateTime.now - 1.year,
  aggie_ring_day: DateTime.now + 1.year,
  birthday: DateTime.new(2002, 2, 14),
  graduation_day: DateTime.new(2024, 5, 10),
  archived: false,
  accepted: false,  # This member is unaccepted
  accomplishments: { "projects" => "Built smart home system", "awards" => "Innovation Award" }
)

DietaryRestriction.create!(item_name: "Peanuts")
DietaryRestriction.create!(item_name: "Gluten")
DietaryRestriction.create!(item_name: "Dairy")
DietaryRestriction.create!(item_name: "Eggs")
DietaryRestriction.create!(item_name: "Shellfish")
DietaryRestriction.create!(item_name: "Soy")
DietaryRestriction.create!(item_name: "Tree Nuts")
DietaryRestriction.create!(item_name: "Wheat")
DietaryRestriction.create!(item_name: "Fish")
DietaryRestriction.create!(item_name: "Sesame")
DietaryRestriction.create!(item_name: "Corn")
DietaryRestriction.create!(item_name: "Pork")
DietaryRestriction.create!(item_name: "Beef")
DietaryRestriction.create!(item_name: "Chicken")
DietaryRestriction.create!(item_name: "Vegan")
DietaryRestriction.create!(item_name: "Vegetarian")
DietaryRestriction.create!(item_name: "Halal")
DietaryRestriction.create!(item_name: "Kosher")
DietaryRestriction.create!(item_name: "Low Sodium")

Interest.create!(interest_type: "career", name: "Software Developer")
Interest.create!(interest_type: "career", name: "Mechanical Engineer")
Interest.create!(interest_type: "career", name: "Electrical Engineer")
Interest.create!(interest_type: "career", name: "Civil Engineer")
Interest.create!(interest_type: "career", name: "Chemical Engineer")
Interest.create!(interest_type: "career", name: "Aerospace Engineer")
Interest.create!(interest_type: "career", name: "Industrial Engineer")
Interest.create!(interest_type: "career", name: "Data Scientist")
Interest.create!(interest_type: "career", name: "Civil Engineering Technician")
Interest.create!(interest_type: "career", name: "Robotics Engineer")
Interest.create!(interest_type: "career", name: "Network Engineer")
Interest.create!(interest_type: "career", name: "Biomedical Engineer")
Interest.create!(interest_type: "career", name: "Environmental Engineer")
Interest.create!(interest_type: "career", name: "Materials Scientist")
Interest.create!(interest_type: "career", name: "Project Engineer")
Interest.create!(interest_type: "career", name: "Automotive Engineer")
Interest.create!(interest_type: "career", name: "Construction Manager")
Interest.create!(interest_type: "career", name: "Renewable Energy Engineer")
Interest.create!(interest_type: "career", name: "Telecommunications Engineer")
Interest.create!(interest_type: "career", name: "Systems Engineer")


Interest.create!(interest_type: "company", name: "Microsoft")
Interest.create!(interest_type: "company", name: "Google")
Interest.create!(interest_type: "company", name: "Apple")
Interest.create!(interest_type: "company", name: "Tesla")
Interest.create!(interest_type: "company", name: "SpaceX")
Interest.create!(interest_type: "company", name: "Amazon")
Interest.create!(interest_type: "company", name: "Intel")
Interest.create!(interest_type: "company", name: "IBM")
Interest.create!(interest_type: "company", name: "NVIDIA")
Interest.create!(interest_type: "company", name: "Qualcomm")
Interest.create!(interest_type: "company", name: "Facebook")
Interest.create!(interest_type: "company", name: "Lockheed Martin")
Interest.create!(interest_type: "company", name: "Boeing")
Interest.create!(interest_type: "company", name: "General Electric")
Interest.create!(interest_type: "company", name: "Northrop Grumman")
Interest.create!(interest_type: "company", name: "Siemens")
Interest.create!(interest_type: "company", name: "Apple")
Interest.create!(interest_type: "company", name: "Adobe")
Interest.create!(interest_type: "company", name: "Oracle")
Interest.create!(interest_type: "company", name: "SAP")

Interest.create!(interest_type: "personal", name: "swimming")
Interest.create!(interest_type: "personal", name: "reading")
Interest.create!(interest_type: "personal", name: "traveling")
Interest.create!(interest_type: "personal", name: "cooking")
Interest.create!(interest_type: "personal", name: "photography")
Interest.create!(interest_type: "personal", name: "painting")
Interest.create!(interest_type: "personal", name: "cycling")
Interest.create!(interest_type: "personal", name: "hiking")
Interest.create!(interest_type: "personal", name: "yoga")
Interest.create!(interest_type: "personal", name: "dancing")
Interest.create!(interest_type: "personal", name: "fishing")
Interest.create!(interest_type: "personal", name: "gardening")
Interest.create!(interest_type: "personal", name: "gaming")
Interest.create!(interest_type: "personal", name: "watching movies")
Interest.create!(interest_type: "personal", name: "playing music")
Interest.create!(interest_type: "personal", name: "writing")
Interest.create!(interest_type: "personal", name: "running")
Interest.create!(interest_type: "personal", name: "skiing")
Interest.create!(interest_type: "personal", name: "fitness")
Interest.create!(interest_type: "personal", name: "volunteering")
