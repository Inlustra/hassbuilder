import { Automation, SensorTarget, SwitchTarget } from "@hassbuilder/base";

export class TurnOffSwitchBinarySensorAutomation extends Automation {
  constructor(
    name: string,
    sensorTarget: SensorTarget,
    switchTarget: SwitchTarget,
    description?: string
  ) {
    super({
      alias: name,
      description,
      trigger: [
        {
          platform: "state",
          entity_id: sensorTarget.id,
          from: "on",
          to: "off",
        },
      ],

      action: [
        {
          service: "switch.turn_off",
          target: {
            entity_id: switchTarget.id,
          },
        },
      ],
    });
  }
}
