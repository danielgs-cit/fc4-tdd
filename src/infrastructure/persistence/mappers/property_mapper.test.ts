import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "Casa de Praia";
    entity.description = "Uma bela casa na praia";
    entity.maxGuests = 6;
    entity.basePricePerNight = 250;

    const domain = PropertyMapper.toDomain(entity);

    expect(domain).toBeInstanceOf(Property);
    expect(domain.getId()).toBe("1");
    expect(domain.getName()).toBe("Casa de Praia");
    expect(domain.getDescription()).toBe("Uma bela casa na praia");
    expect(domain.getMaxGuests()).toBe(6);
    expect(domain.getBasePricePerNight()).toBe(250);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const entitySemNome = new PropertyEntity();
    entitySemNome.id = "2";
    entitySemNome.name = "";
    entitySemNome.description = "Descrição qualquer";
    entitySemNome.maxGuests = 4;
    entitySemNome.basePricePerNight = 100;

    expect(() => PropertyMapper.toDomain(entitySemNome)).toThrow(
      "O nome é obrigatório"
    );

    const entityMaxGuestsZero = new PropertyEntity();
    entityMaxGuestsZero.id = "3";
    entityMaxGuestsZero.name = "Apartamento";
    entityMaxGuestsZero.description = "Descrição qualquer";
    entityMaxGuestsZero.maxGuests = 0;
    entityMaxGuestsZero.basePricePerNight = 100;

    expect(() => PropertyMapper.toDomain(entityMaxGuestsZero)).toThrow(
      "O número máximo de hóspedes deve ser maior que zero"
    );
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const domain = new Property(
      "1",
      "Casa de Praia",
      "Uma bela casa na praia",
      6,
      250
    );

    const entity = PropertyMapper.toPersistence(domain);

    expect(entity).toBeInstanceOf(PropertyEntity);
    expect(entity.id).toBe("1");
    expect(entity.name).toBe("Casa de Praia");
    expect(entity.description).toBe("Uma bela casa na praia");
    expect(entity.maxGuests).toBe(6);
    expect(entity.basePricePerNight).toBe(250);
  });
});
