import {
  Automation,
  SensorTarget,
  SwitchTarget,
  statesNotationTransform,
} from "@hassbuilder/base";

export class BoilerShutOffAutomation extends Automation {
  constructor(
    radiatorHeatNeededSensor: SensorTarget,
    boilerSwitch: SwitchTarget
  ) {
    super({
      alias: "Turn off boiler when all rads satisfied",
      trigger: [
        {
          platform: "state",
          entity_id: radiatorHeatNeededSensor.id,
        },
      ],
      condition: [
        {
          condition: "template",
          value_template: `{{ states('${radiatorHeatNeededSensor.id}') | float == 0 }}`,
        },
        {
          condition: "template",
          value_template: `{% set changed = as_timestamp(${statesNotationTransform(
            boilerSwitch.id
          )}.last_changed) %}
            {% set now = as_timestamp(now()) %}
            {% set time = now - changed %}
            {% set minutes = (time / 60) | int %}
            {{ minutes > 5 }}`,
        },
      ],
      action: [
        {
          service: "switch.turn_off",
          target: {
            entity_id: boilerSwitch.id,
          },
        },
      ],
    });
  }
}
