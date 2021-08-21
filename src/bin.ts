#!/usr/bin/env node

import debugFactory from 'debug'
import {Cli, Builtins} from 'clipanion'
import {DateCommand} from './commands/date.js'
import {PackageJson} from 'type-fest'

debugFactory.enable('timer:*')

const pkg: PackageJson = require('../package.json')
const [node, app, ...args] = process.argv
const cli = new Cli({
  binaryLabel: pkg.name,
  binaryName: pkg.name,
  binaryVersion: pkg.version,
})

cli.register(DateCommand)
cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)
cli.register(Builtins.DefinitionsCommand)

cli.runExit(args, Cli.defaultContext)
