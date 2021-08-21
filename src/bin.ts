#!/usr/bin/env node

import canvas from 'canvas'
import clipanion from 'clipanion'
import sharp from 'sharp'
import exifr from 'exifr'
import moment from 'moment'
import fs from 'fs-extra'
import mozjpeg from 'node-mozjpeg'
import MeasureTimer from './Timer'
import debugFactory from 'debug'
import {Cli, Builtins} from 'clipanion'
import {DateCommand} from './commands/date.js'

debugFactory.enable('timer:*')

const [node, app, ...args] = process.argv
const pkg = require('../package.json')
const cli = new Cli({
  binaryLabel: pkg.name,
  binaryName: pkg.name,
  binaryVersion: `1.0.0`,
})

cli.register(DateCommand)
cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)
cli.register(Builtins.DefinitionsCommand)

cli.runExit(args, Cli.defaultContext)
