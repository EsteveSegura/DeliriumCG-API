const Pulse = require('../../../domain/plugin/triggers/pulse');

const triggerBuilder = ({ }) => {
  return {
    build: (triggers) => {
      const allTriggers = triggers.map(trigger => {
        switch (trigger.type) {
          case 'pulse':
            const newTrigger = new Pulse(trigger)
            return newTrigger
        }
      });

      return allTriggers;
    },
    make: (triggers) => {
      const allTriggers = triggers.map(trigger => {
        switch (trigger.type) {
          case 'pulse':
            const newTrigger = new Pulse(trigger)
            return newTrigger.toObject()
        }
      });

      return allTriggers;
    },
  }
}

module.exports = triggerBuilder