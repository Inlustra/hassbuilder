import { JsonIgnore } from "../utils/json-ignore";
import { CreatableEntity } from "./entity";
import { HATemplateSensor } from "@hassbuilder/types";
import { snakeCase } from "change-case";
import { SensorTarget } from "../configuration";

export class TemplateSensor<P extends any = undefined>
  extends CreatableEntity<"sensor">
  implements HATemplateSensor, SensorTarget
{
  name!: string;
  unique_id!: string;
  state!: string;
  unit_of_measurement?: string | undefined;
  attributes?: { [key: string]: string } | undefined;

  @JsonIgnore
  parent: P;

  constructor(
    ...[entity, parent]: P extends undefined
      ? [PartialBy<HATemplateSensor, "unique_id">, undefined?]
      : [PartialBy<HATemplateSensor, "unique_id">, P]
  ) {
    const fullEntity = {
      ...entity,
      unique_id: entity.unique_id ?? snakeCase(entity.name),
    };
    super("sensor", `sensor.${snakeCase(entity.name)}`);
    this.parent = parent as any;
    Object.assign(this, fullEntity);
  }
}
