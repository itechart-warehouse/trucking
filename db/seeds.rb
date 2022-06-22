# Roles
roles = Role.create([{ role_name: 'dispatcher' }, { role_name: 'owner' }, { role_name: 'driver' },
                     { role_name: 'manager' }, { role_name: 'admin' }, { role_name: 'system administrator' },
                     { role_name: 'warehouseman' }])
# Truck types
truck_types = TruckType.create([{ truck_type_name: 'covered body' },
                                { truck_type_name: 'refrigerator' }, { truck_type_name: 'cistern' }])
# Companies
companies = Company.create([{ name: 'jetlogistic' }, { name: 'gruzimvse' }])

User.skip_callback(:validation, :before, :generate_password)

countries = Country.create([{ name: 'Belarus' },
                            { name: 'Albania' },
                            { name: 'Algeria' },
                            { name: 'Andorra' },])
cities = Country.create(name:'Poland').city.create([{ name: 'Liverpool' },
                            { name: 'Manchester' },
                            { name: 'Bradford' },
                            { name: 'Brighton & Hove' },])
# System admin
sys_Admin = User.create(
  email: 'sysadmin@example.com',
  password: 'sysadmin123',
  first_name: 'sysAdmin',
  second_name: 'sysAdminov',
  middle_name: 'sysAdminovich',
  birthday: Date.parse('01/01/1970'),
  passport: '11337218, issued by the police department of the Centralniy district of Homel',
  login: 'sysAdmin',
  role: Role.find_by(role_name: 'system administrator'),
  address: Address.new(town: 'Homel', street: 'Platonova', building: 43, apartment: 83),
  confirmed_at: DateTime.now
)
# jetlogistic trucks
jetlogistic_trucks = Truck.create([
                                    { fuel_consumption: 33.33, truck_number: 'MAN 32-66 BY',
                                      truck_type: TruckType.find_by(truck_type_name: 'covered body'), company: Company.find_by(name: 'jetlogistic') },
                                    { fuel_consumption: 17.74, truck_number: 'МАЗ 13-33 BY',
                                      truck_type: TruckType.find_by(truck_type_name: 'covered body'), company: Company.find_by(name: 'jetlogistic') }
                                  ])
# jetlogistic users
jetlogistic_admin = User.create(
  email: 'jetlogisticadmin@example.com',
  password: 'jetlogisticadmin123',
  first_name: 'Kirill',
  second_name: 'Kirillov',
  middle_name: 'Kirillovich',
  birthday: Date.parse('13/11/1996'),
  passport: '18231873, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticAdmin',
  role: Role.find_by(role_name: 'admin'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 77, apartment: 45),
  company: Company.find_by(name: 'jetlogistic'),
  confirmed_at: DateTime.now
)
jetlogistic_owner = User.create(
  email: 'jetlogisticowner@example.com',
  password: 'jetlogisticowner123',
  first_name: 'Petr',
  second_name: 'Petrov',
  middle_name: 'Petrovich',
  birthday: Date.parse('01/01/2000'),
  passport: '44454874, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticOwner',
  role: Role.find_by(role_name: 'owner'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 55, apartment: 4),
  company: Company.find_by(name: 'jetlogistic'),
  confirmed_at: DateTime.now
)
jetlogistic_dispatcher = User.create(
  email: 'jetlogisticdispatcher@example.com',
  password: 'jetlogisticdispatcher123',
  first_name: 'Ivan',
  second_name: 'Ivanov',
  middle_name: 'Ivanovich',
  birthday: Date.parse('02/02/2002'),
  passport: '90914112, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticDispatcher',
  role: Role.find_by(role_name: 'dispatcher'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 60, apartment: 6),
  company: Company.find_by(name: 'jetlogistic'),
  confirmed_at: DateTime.now
)
jetlogistic_manager = User.create(
  email: 'jetlogisticmanager@example.com',
  password: 'jetlogisticmanager123',
  first_name: 'Dmitriy',
  second_name: 'Dmitrov',
  middle_name: 'Dmitrievich',
  birthday: Date.parse('03/03/2003'),
  passport: '47111504, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticManager',
  role: Role.find_by(role_name: 'manager'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 13, apartment: 3),
  company: Company.find_by(name: 'jetlogistic'),
  confirmed_at: DateTime.now
)
jetlogistic_driver = User.create(
  email: 'jetlogisticdriver@example.com',
  password: 'jetlogisticdriver123',
  first_name: 'Alex',
  second_name: 'Alexov',
  middle_name: 'Alexeevich',
  birthday: Date.parse('04/04/2004'),
  passport: '84485967, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticDriver',
  role: Role.find_by(role_name: 'driver'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 14, apartment: 41),
  company: Company.find_by(name: 'jetlogistic'),
  confirmed_at: DateTime.now
)
# gruzimvse trucks
gruzimvse_trucks = Truck.create([
                                  { fuel_consumption: 25.03, truck_number: 'MAN 07-81 BY',
                                    truck_type: TruckType.find_by(truck_type_name: 'refrigerator'), company: Company.find_by(name: 'gruzimvse') },
                                  { fuel_consumption: 13.50, truck_number: 'МАЗ 51-44 BY',
                                    truck_type: TruckType.find_by(truck_type_name: 'cistern'), company: Company.find_by(name: 'gruzimvse') }
                                ])
# gruzimvse users
gruzimvse_admin = User.create(
  email: 'gruzimvseadmin@example.com',
  password: 'gruzimvseadmin123',
  first_name: 'Albert',
  second_name: 'Albertov',
  middle_name: 'Albertovich',
  birthday: Date.parse('26/10/1997'),
  passport: '79423065, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseAdmin',
  role: Role.find_by(role_name: 'admin'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 113, apartment: 74),
  company: Company.find_by(name: 'gruzimvse'),
  confirmed_at: DateTime.now
)
gruzimvse_owner = User.create(
  email: 'gruzimvseowner@example.com',
  password: 'gruzimvseowner123',
  first_name: 'Nikita',
  second_name: 'Nikitin',
  middle_name: 'Nikitovich',
  birthday: Date.parse('22/02/1992'),
  passport: '90952744, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseOwner',
  role: Role.find_by(role_name: 'owner'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 33, apartment: 22),
  company: Company.find_by(name: 'gruzimvse'),
  confirmed_at: DateTime.now
)
gruzimvse_dispatcher = User.create(
  email: 'gruzimvsedispatcher@example.com',
  password: 'gruzimvsedispatcher123',
  first_name: 'Anton',
  second_name: 'Antonov',
  middle_name: 'Antonovich',
  birthday: Date.parse('17/05/1998'),
  passport: '64746245, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseDispatcher',
  role: Role.find_by(role_name: 'dispatcher'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 66, apartment: 102),
  company: Company.find_by(name: 'gruzimvse'),
  confirmed_at: DateTime.now
)
gruzimvse_manager = User.create(
  email: 'gruzimvsemanager@example.com',
  password: 'gruzimvsemanager123',
  first_name: 'Max',
  second_name: 'Maximov',
  middle_name: 'Maximovich',
  birthday: Date.parse('22/02/1992'),
  passport: '86199183, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseManager',
  role: Role.find_by(role_name: 'manager'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 107, apartment: 3),
  company: Company.find_by(name: 'gruzimvse'),
  confirmed_at: DateTime.now
)
gruzimvse_driver = User.create(
  email: 'gruzimvsedriver@example.com',
  password: 'gruzimvse123',
  first_name: 'Artem',
  second_name: 'Artemov',
  middle_name: 'Artemovich',
  birthday: Date.parse('07/07/2002'),
  passport: '70006831, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseDriver',
  role: Role.find_by(role_name: 'driver'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 77, apartment: 8),
  company: Company.find_by(name: 'gruzimvse'),
  confirmed_at: DateTime.now
)

# Goods owners
goods_owner_ibm = GoodsOwner.create(goods_owner_name: 'IBM',
                                    address: Address.new(
                                      town: 'Homel', street: 'Proletarskaya', building: 77, apartment: 1
                                    ))
goods_owner_tradep = GoodsOwner.create(goods_owner_name: 'Trade power',
                                       address: Address.new(
                                         town: 'Homel', street: 'Proletarskaya', building: 71, apartment: 1
                                       ))

# Warehouses and their owners
grocery_store_owner = User.create(
  email: 'grocerystoreowner@example.com',
  password: 'grocerystoreowner123',
  first_name: 'Jhon',
  second_name: 'Jhonov',
  middle_name: 'jhonovich',
  birthday: Date.parse('12/03/1997'),
  passport: '15206181, issued by the police department of the Centralniy district of Vilnus',
  login: 'grocerystoreowner',
  role: Role.find_by(role_name: 'warehouseman'),
  address: Address.new(town: 'Vilnus', street: 'Volnaya', building: 13, apartment: 8),
  confirmed_at: DateTime.now
)
Grocery_store = Warehouse.create(
  warehouse_name: 'Grocery store', warehouseman: grocery_store_owner, address: Address.new(town: 'Homel', street: 'Sovetskaya',
                                                                                           building: 60, apartment: 1), trusted: false
)
shopping_center_owner = User.create(
  email: 'shoppingcenterowner@example.com',
  password: 'shoppingcenterowner123',
  first_name: 'Mira',
  second_name: 'Mirova',
  middle_name: 'Mironovna',
  birthday: Date.parse('31/12/1998'),
  passport: '18397261, issued by the police department of the Centralniy district of Vilnus',
  login: 'shoppingcenterowner',
  role: Role.find_by(role_name: 'warehouseman'),
  address: Address.new(town: 'Vilnus', street: 'Volnaya', building: 13, apartment: 8),
  confirmed_at: DateTime.now
)
Shopping_center = Warehouse.create(
  warehouse_name: 'Almi', address: Address.new(town: 'Homel', street: 'Mazurova', building: 79,
                                               apartment: 1), trusted: true, warehouseman: shopping_center_owner
)

User.set_callback(:validation, :before, :generate_password)

# Consignments, Waybills and goods
15.times do |i|
  # jetlogistics consignments and goods
  instance_variable_set("@CSJ_#{i}", Consignment.create(bundle_seria: "BSJ_#{i}", bundle_number: "10#{i}".to_i, consignment_seria: "CSJ_#{i}",
                                                        consignment_number: "10#{i}".to_i, driver_id: 6, truck_id: 2, dispatcher_id: 4))
  instance_variable_set("@CSJ_#{i}_goods", Good.create([
                                                         { consignment: instance_variable_get("@CSJ_#{i}"),
                                                           good_name: 'product_1', unit_of_measurement: 'item',
                                                           quantity: (i + 1) },
                                                         { consignment: instance_variable_get("@CSJ_#{i}"),
                                                           good_name: 'product_2', unit_of_measurement: 'item',
                                                           quantity: (i + 5) }
                                                       ]))
  # gruzimvse consignments and goods
  instance_variable_set("@CSG_#{i}", Consignment.create(bundle_seria: "BSG_#{i}", bundle_number: "20#{i}".to_i, consignment_seria: "CSG_#{i}",
                                                        consignment_number: "20#{i}".to_i, driver_id: 11, truck_id: 4, dispatcher_id: 9))
  instance_variable_set("@CSG_#{i}_goods", Good.create([
                                                         { consignment: instance_variable_get("@CSG_#{i}"),
                                                           good_name: 'product_1', unit_of_measurement: 'item',
                                                           quantity: (i + 1) },
                                                         { consignment: instance_variable_get("@CSG_#{i}"),
                                                           good_name: 'product_2', unit_of_measurement: 'item',
                                                           quantity: (i + 5) }
                                                       ]))
  # Waybills
  next unless i <= 5

  # jetlogistics waybills
  Good.where(consignment: instance_variable_get("@CSJ_#{i}")).each do |item|
    item.update!(status: 'checked')
  end
  instance_variable_get("@CSJ_#{i}").update!(status: 'checked', manager_id: 5)
  instance_variable_set("@startpoint_J#{i}",
                        Address.create!(town: "StartCity_J#{i}", street: 'StartovayaJ',
                                        building: (i + 1)))
  instance_variable_set("@endpoint_J#{i}",
                        Address.create!(town: "EndCity_J#{i}", street: 'EndovayaJ',
                                        building: (i + 1)))
  instance_variable_set("@Waybill_CSJ_#{i}", Waybill.create(
                                               start_date: Date.parse("#{i + 1}/04/2022"),
                                               end_date: Date.parse("#{i + 3}/04/2022"),
                                               consignment: instance_variable_get("@CSJ_#{i}"),
                                               startpoint: instance_variable_get("@startpoint_J#{i}"),
                                               endpoint: instance_variable_get("@endpoint_J#{i}"),
                                               goods_owner_id: goods_owner_tradep.id,
                                               warehouse: Grocery_store,
                                               waybill_seria: "WSJ_#{i}",
                                               waybill_number: "10#{i}".to_i
                                             ))
  instance_variable_set("@checkpoints_waybill_CSJ_#{i}", Checkpoint.create([
                                                                             {
                                                                               city: "checkpoint_1_#{i}", waybill: instance_variable_get("@Waybill_CSJ_#{i}")
                                                                             },
                                                                             {
                                                                               city: "checkpoint_2_#{i}", waybill: instance_variable_get("@Waybill_CSJ_#{i}")
                                                                             }
                                                                           ]))
  # gruzimvse waybills
  Good.where(consignment: instance_variable_get("@CSG_#{i}")).each do |item|
    item.update!(status: 'checked')
  end
  instance_variable_get("@CSG_#{i}").update(status: 'checked', manager_id: 10)
  instance_variable_set("@startpoint_G#{i}",
                        Address.create!(town: "StartCity_G#{i}", street: 'StartovayaG',
                                        building: (i + 1)))
  instance_variable_set("@endpoint_G#{i}",
                        Address.create!(town: "EndCity_G#{i}", street: 'EndovayaG',
                                        building: (i + 1)))
  instance_variable_set("@Waybill_CSG_#{i}", Waybill.create(
                                               start_date: Date.parse("#{i + 10}/04/2022"),
                                               end_date: Date.parse("#{i + 12}/04/2022"),
                                               consignment: instance_variable_get("@CSG_#{i}"),
                                               startpoint: instance_variable_get("@startpoint_G#{i}"),
                                               endpoint: instance_variable_get("@endpoint_G#{i}"),
                                               goods_owner_id: goods_owner_ibm.id,
                                               warehouse: Shopping_center,
                                               waybill_seria: "WSG_#{i}",
                                               waybill_number: "20#{i}".to_i
                                             ))
  instance_variable_set("@checkpoints_waybill_CSG_#{i}", Checkpoint.create([
                                                                             {
                                                                               city: "checkpoint_1_#{i}", waybill: instance_variable_get("@Waybill_CSG_#{i}")
                                                                             },
                                                                             {
                                                                               city: "checkpoint_2_#{i}", waybill: instance_variable_get("@Waybill_CSG_#{i}")
                                                                             }
                                                                           ]))
  next unless i <= 2

  # Deliver jetlogistics waybills, consignments and goods
  instance_variable_get("@checkpoints_waybill_CSJ_#{i}").each do |checkpoint|
    checkpoint.update!(is_passed: 'true', pass_date: Date.today)
  end
  instance_variable_get("@CSJ_#{i}").update!(status: 'delivered')

  Waybill.where(consignment: instance_variable_get("@CSJ_#{i}")).each do |waybill|
    waybill.update!(status: 'delivered to the recipient')
  end

  Good.where(consignment: instance_variable_get("@CSJ_#{i}")).each do |item|
    item.update!(status: 'delivered')
  end

  # Deliver gruzimvse waybills, consignments and goods
  instance_variable_get("@checkpoints_waybill_CSG_#{i}").each do |checkpoint|
    checkpoint.update!(is_passed: 'true', pass_date: Date.today)
  end
  instance_variable_get("@CSG_#{i}").update!(status: 'delivered')

  Waybill.where(consignment: instance_variable_get("@CSG_#{i}")).each do |waybill|
    waybill.update!(status: 'delivered to the recipient')
  end

  Good.where(consignment: instance_variable_get("@CSG_#{i}")).each do |item|
    item.update!(status: 'delivered')
  end

  # Write-off Acts jetlogistics
  instance_variable_set("@WoA_CSJ_#{i}", WriteOffAct.create(good_name: 'product_1', lost_quantity: 1,
                                                            consignment: instance_variable_get("@CSJ_#{i}"), description: 'Lost'))

  # Write-off Acts gruzimvse
  instance_variable_set("@WoA_CSG_#{i}", WriteOffAct.create(good_name: 'product_2', lost_quantity: 1,
                                                            consignment: instance_variable_get("@CSG_#{i}"), description: 'Stolen'))
end
