Member.create!(
  uin: 123456789,
  first_name: "John",
  last_name: "Smith",
  role: "president",
  major: "Computer Science",
  year: 2024,
  email: "john.doe@example.com",
  phone: 123456,
  tshirt_size: "M",
  paid_dues: true,
  join_date: DateTime.now - 2.years,
  aggie_ring_day: DateTime.now + 6.months,
  birthday: DateTime.new(2002, 6, 15),
  graduation_day: DateTime.new(2024, 5, 15),
  archived: false,
  accepted: true,
  accomplishments: { "leadership" => "Organized major event", "awards" => "Outstanding Member 2023" }
)

Member.create!(
  uin: 987654321,
  first_name: "Jane",
  last_name: "Smith",
  role: "vice_president",
  major: "Electrical Engineering",
  year: 2023,
  email: "jane.smith@example.com",
  phone: "555-5678",
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


# Add more members as needed
