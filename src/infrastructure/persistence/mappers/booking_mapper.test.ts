import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

function makePropertyEntity(): PropertyEntity {
  const e = new PropertyEntity();
  e.id = "prop-1";
  e.name = "Apartamento";
  e.description = "Descrição";
  e.maxGuests = 4;
  e.basePricePerNight = 100;
  return e;
}

function makeUserEntity(): UserEntity {
  const e = new UserEntity();
  e.id = "user-1";
  e.name = "João Silva";
  return e;
}

function makeBookingEntity(): BookingEntity {
  const e = new BookingEntity();
  e.id = "booking-1";
  e.property = makePropertyEntity();
  e.guest = makeUserEntity();
  e.startDate = new Date("2024-12-20");
  e.endDate = new Date("2024-12-25");
  e.guestCount = 2;
  e.totalPrice = 500;
  e.status = "CONFIRMED";
  return e;
}

describe("BookingMapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const entity = makeBookingEntity();

    const domain = BookingMapper.toDomain(entity);

    expect(domain).toBeInstanceOf(Booking);
    expect(domain.getId()).toBe("booking-1");
    expect(domain.getProperty().getId()).toBe("prop-1");
    expect(domain.getGuest().getId()).toBe("user-1");
    expect(domain.getGuestCount()).toBe(2);
    expect(domain.getTotalPrice()).toBe(500);
    expect(domain.getStatus()).toBe("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const entityGuestInvalido = makeBookingEntity();
    entityGuestInvalido.guest = { id: "user-1", name: "" } as UserEntity;

    expect(() => BookingMapper.toDomain(entityGuestInvalido)).toThrow(
      "O nome é obrigatório"
    );

    const entityPropertySemNome = makeBookingEntity();
    entityPropertySemNome.property = {
      ...makePropertyEntity(),
      name: "",
    } as PropertyEntity;

    expect(() => BookingMapper.toDomain(entityPropertySemNome)).toThrow(
      "O nome é obrigatório"
    );
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property("prop-1", "Apartamento", "Descrição", 4, 100);
    const guest = new User("user-1", "João Silva");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25")
    );
    const booking = new Booking("booking-1", property, guest, dateRange, 2);

    const entity = BookingMapper.toPersistence(booking);

    expect(entity).toBeInstanceOf(BookingEntity);
    expect(entity.id).toBe("booking-1");
    expect(entity.property.id).toBe("prop-1");
    expect(entity.guest.id).toBe("user-1");
    expect(entity.guestCount).toBe(2);
    expect(entity.totalPrice).toBe(booking.getTotalPrice());
    expect(entity.status).toBe("CONFIRMED");
  });
});
