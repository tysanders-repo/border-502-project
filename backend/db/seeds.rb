Member.find_or_create_by!(uin: 123456780) do |member|
  member.first_name = "EWB"
  member.last_name = "ProjectLead"
  member.role = "project lead"
  member.major = "Civil Engineering"
  member.year = 2024
  member.email = "ewbappprojectlead@gmail.com"
  member.phone = 1234567890
  member.tshirt_size = "M"
  member.paid_dues = true
  member.join_date = DateTime.now - 2.years
  member.aggie_ring_day = DateTime.now + 6.months
  member.birthday = DateTime.new(2000, 5, 1)
  member.graduation_day = DateTime.new(2024, 5, 15)
  member.archived = false
  member.accepted = true
  member.accomplishments = { "leadership" => "Organized major event", "awards" => "Outstanding Leadership 2023" }
end

Member.find_or_create_by!(uin: 123456789) do |member|
  member.first_name = "EWB"
  member.last_name = "President"
  member.role = "president"
  member.major = "Civil Engineering"
  member.year = 2024
  member.email = "ewbapppresident@gmail.com"
  member.phone = 1234567890
  member.tshirt_size = "M"
  member.paid_dues = true
  member.join_date = DateTime.now - 2.years
  member.aggie_ring_day = DateTime.now + 6.months
  member.birthday = DateTime.new(2000, 5, 1)
  member.graduation_day = DateTime.new(2024, 5, 15)
  member.archived = false
  member.accepted = true
  member.accomplishments = { "leadership" => "Organized major event", "awards" => "Outstanding Leadership 2023" }
end

Member.find_or_create_by!(uin: 987654321) do |member|
  member.first_name = "EWB"
  member.last_name = "Treasurer"
  member.role = "treasurer"
  member.major = "Accounting"
  member.year = 2024
  member.email = "ewbapptreasurer@gmail.com"
  member.phone = 9876543210
  member.tshirt_size = "L"
  member.paid_dues = true
  member.join_date = DateTime.now - 1.years
  member.aggie_ring_day = DateTime.now + 6.months
  member.birthday = DateTime.new(2001, 8, 20)
  member.graduation_day = DateTime.new(2024, 5, 15)
  member.archived = false
  member.accepted = true
  member.accomplishments = { "leadership" => "Managed financial reports", "awards" => "Financial Excellence 2023" }
end

Member.find_or_create_by!(uin: 112233445) do |member|
  member.first_name = "EWB"
  member.last_name = "Ir"
  member.role = "internal relations"
  member.major = "Marketing"
  member.year = 2024
  member.email = "ewbappir@gmail.com"
  member.phone = 1122334455
  member.tshirt_size = "S"
  member.paid_dues = true
  member.join_date = DateTime.now - 3.years
  member.aggie_ring_day = DateTime.now + 6.months
  member.birthday = DateTime.new(1999, 11, 12)
  member.graduation_day = DateTime.new(2024, 5, 15)
  member.archived = false
  member.accepted = true
  member.accomplishments = { "leadership" => "Led communication campaigns", "awards" => "Excellence in Communication 2023" }
end

Member.find_or_create_by!(uin: 511223344) do |member|
  member.first_name = "EWB"
  member.last_name = "Pl"
  member.role = "project lead"
  member.major = "Business Administration"
  member.year = 2024
  member.email = "ewbappprojectlead@gmail.com"
  member.phone = 5511223344
  member.tshirt_size = "S"
  member.paid_dues = true
  member.join_date = DateTime.now - 3.years
  member.aggie_ring_day = DateTime.now + 6.months
  member.birthday = DateTime.new(2003, 7, 12)
  member.graduation_day = DateTime.new(2025, 5, 12)
  member.archived = false
  member.accepted = true
  member.accomplishments = { "awards" => "Best EWB Officer 2023" }
end

Member.find_or_create_by!(uin: 210398210) do |member|
  member.first_name = "Jane"
  member.last_name = "Smith Jr"
  member.role = "member"
  member.major = "Computer Engineering"
  member.year = 2023
  member.email = "jane.smith2@example.com"
  member.phone = "555-555"
  member.tshirt_size = "S"
  member.paid_dues = true
  member.join_date = DateTime.now - 3.years
  member.aggie_ring_day = DateTime.now + 3.months
  member.birthday = DateTime.new(2001, 8, 25)
  member.graduation_day = DateTime.new(2023, 5, 15)
  member.archived = false
  member.accepted = true
  member.accomplishments = { "projects" => "Led robotics project", "awards" => "Vice President Excellence Award" }
end

Member.find_or_create_by!(uin: 210398211) do |member|
  member.first_name = "John"
  member.last_name = "Doe"
  member.role = "member"
  member.major = "Electrical Engineering"
  member.year = 2024
  member.email = "john.doe2@example.com"
  member.phone = "555-1234"
  member.tshirt_size = "M"
  member.paid_dues = false
  member.join_date = DateTime.now - 1.year
  member.aggie_ring_day = DateTime.now + 1.year
  member.birthday = DateTime.new(2002, 2, 14)
  member.graduation_day = DateTime.new(2024, 5, 10)
  member.archived = false
  member.accepted = false
  member.accomplishments = { "projects" => "Built smart home system", "awards" => "Innovation Award" }
end


dietary_restrictions = [ "Peanuts", "Gluten", "Dairy", "Eggs", "Shellfish", "Soy", "Tree Nuts", "Wheat", "Fish", "Sesame", "Corn", "Pork", "Beef", "Chicken", "Vegan", "Vegetarian", "Halal", "Kosher", "Low Sodium" ]

dietary_restrictions.each do |item_name|
  DietaryRestriction.find_or_create_by!(item_name: item_name)
end

Interest.find_or_create_by!(interest_type: "career", name: "Software Developer")
Interest.find_or_create_by!(interest_type: "career", name: "Mechanical Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Electrical Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Civil Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Chemical Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Aerospace Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Industrial Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Data Scientist")
Interest.find_or_create_by!(interest_type: "career", name: "Civil Engineering Technician")
Interest.find_or_create_by!(interest_type: "career", name: "Robotics Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Network Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Biomedical Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Environmental Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Materials Scientist")
Interest.find_or_create_by!(interest_type: "career", name: "Project Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Automotive Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Construction Manager")
Interest.find_or_create_by!(interest_type: "career", name: "Renewable Energy Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Telecommunications Engineer")
Interest.find_or_create_by!(interest_type: "career", name: "Systems Engineer")

Interest.find_or_create_by!(interest_type: "company", name: "Microsoft")
Interest.find_or_create_by!(interest_type: "company", name: "Google")
Interest.find_or_create_by!(interest_type: "company", name: "Apple")
Interest.find_or_create_by!(interest_type: "company", name: "Tesla")
Interest.find_or_create_by!(interest_type: "company", name: "SpaceX")
Interest.find_or_create_by!(interest_type: "company", name: "Amazon")
Interest.find_or_create_by!(interest_type: "company", name: "Intel")
Interest.find_or_create_by!(interest_type: "company", name: "IBM")
Interest.find_or_create_by!(interest_type: "company", name: "NVIDIA")
Interest.find_or_create_by!(interest_type: "company", name: "Qualcomm")
Interest.find_or_create_by!(interest_type: "company", name: "Facebook")
Interest.find_or_create_by!(interest_type: "company", name: "Lockheed Martin")
Interest.find_or_create_by!(interest_type: "company", name: "Boeing")
Interest.find_or_create_by!(interest_type: "company", name: "General Electric")
Interest.find_or_create_by!(interest_type: "company", name: "Northrop Grumman")
Interest.find_or_create_by!(interest_type: "company", name: "Siemens")
Interest.find_or_create_by!(interest_type: "company", name: "Apple")
Interest.find_or_create_by!(interest_type: "company", name: "Adobe")
Interest.find_or_create_by!(interest_type: "company", name: "Oracle")
Interest.find_or_create_by!(interest_type: "company", name: "SAP")

Interest.find_or_create_by!(interest_type: "personal", name: "swimming")
Interest.find_or_create_by!(interest_type: "personal", name: "reading")
Interest.find_or_create_by!(interest_type: "personal", name: "traveling")
Interest.find_or_create_by!(interest_type: "personal", name: "cooking")
Interest.find_or_create_by!(interest_type: "personal", name: "photography")
Interest.find_or_create_by!(interest_type: "personal", name: "painting")
Interest.find_or_create_by!(interest_type: "personal", name: "cycling")
Interest.find_or_create_by!(interest_type: "personal", name: "hiking")
Interest.find_or_create_by!(interest_type: "personal", name: "yoga")
Interest.find_or_create_by!(interest_type: "personal", name: "dancing")
Interest.find_or_create_by!(interest_type: "personal", name: "fishing")
Interest.find_or_create_by!(interest_type: "personal", name: "gardening")
Interest.find_or_create_by!(interest_type: "personal", name: "gaming")
Interest.find_or_create_by!(interest_type: "personal", name: "watching movies")
Interest.find_or_create_by!(interest_type: "personal", name: "playing music")
Interest.find_or_create_by!(interest_type: "personal", name: "writing")
Interest.find_or_create_by!(interest_type: "personal", name: "running")
Interest.find_or_create_by!(interest_type: "personal", name: "skiing")
Interest.find_or_create_by!(interest_type: "personal", name: "fitness")
Interest.find_or_create_by!(interest_type: "personal", name: "volunteering")

projects = [
  {
    title: "Clean Water Initiative",
    description: "A project aimed at providing access to clean and safe drinking water in underserved communities.",
    date: DateTime.new(2024, 10, 1),
    pictures: {},
    timeline: {}
  },
  {
    title: "Sustainable Housing Project",
    description: "Development of sustainable housing solutions for families in need, utilizing eco-friendly materials.",
    date: DateTime.new(2024, 11, 15),
    pictures: {},
    timeline: {}
  },
  {
    title: "Renewable Energy for Rural Areas",
    description: "Implementation of solar energy systems to reduce dependence on non-renewable energy sources.",
    date: DateTime.new(2024, 12, 20),
    pictures: {},
    timeline: {}
  },
  {
    title: "Education and Empowerment Program",
    description: "Creating educational resources and training programs to empower local communities.",
    date: DateTime.new(2025, 1, 10),
    pictures: {},
    timeline: {}
  },
  {
    title: "Food Security Initiative",
    description: "A project focused on improving food security through sustainable agricultural practices.",
    date: DateTime.new(2025, 2, 5),
    pictures: {},
    timeline: {}
  }
]

projects.each do |project|
  Project.find_or_create_by!(title: project[:title]) do |p|
    p.description = project[:description]
    p.date = project[:date]
    p.pictures = project[:pictures]
    p.timeline = project[:timeline]
  end
end
