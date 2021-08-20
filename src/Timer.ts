import debugFactory from 'debug'
import {performance} from 'perf_hooks'

export default class MeasureTimer {
  private funcName: string
  private debug: debugFactory.Debugger

  private startPoint: number
  private stepStartPoint: number
  private steps: Array<[step: string, cost: number]> = []

  constructor(funcName: string, autoStart = true) {
    this.funcName = funcName
    this.debug = debugFactory(`timer:${funcName}`)
    if (autoStart) {
      this.start()
    }
  }

  start = () => {
    this.stepStartPoint = this.startPoint = performance.now()
  }

  private getCost() {
    return Number((performance.now() - this.startPoint).toFixed(0))
  }
  private getStepCost() {
    return Number((performance.now() - this.stepStartPoint).toFixed(0))
  }

  mark = (label: string) => {
    const stepCost = this.getStepCost()
    this.steps.push([label, stepCost])
    this.debug('[%s] cost %sms, total %sms', label, stepCost, this.getCost())
    this.stepStartPoint = performance.now()
  }

  summary = () => {
    this.debug('[summary] cost %sms', this.getCost())
  }

  step = async (label: string, body: () => Promise<void> | void) => {
    const start = performance.now()
    await Promise.resolve(body())
    this.debug('[%s] cost %sms', label, (performance.now() - start).toFixed(0))
  }
}
