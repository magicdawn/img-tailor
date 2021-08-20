# img-tailor

> ✂️ 操作图片的小裁缝

[![Build Status](https://img.shields.io/travis/magicdawn/img-tailor.svg?style=flat-square)](https://travis-ci.org/magicdawn/img-tailor)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/img-tailor.svg?style=flat-square)](https://codecov.io/gh/magicdawn/img-tailor)
[![npm version](https://img.shields.io/npm/v/img-tailor.svg?style=flat-square)](https://www.npmjs.com/package/img-tailor)
[![npm downloads](https://img.shields.io/npm/dm/img-tailor.svg?style=flat-square)](https://www.npmjs.com/package/img-tailor)
[![npm license](https://img.shields.io/npm/l/img-tailor.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ cnpm i img-tailor -g
```

### 未发布

- sharp / libvips 兼容性, 考虑 heif / ... 其他 sharp bundle 的 libvips 不支持的格式
- globby esm module, 降级
- date command 完善
  - [ ] 支持 output
  - [ ] 支持 字体, 颜色, 位置设置
  - [ ] 支持内容自定义, date format

## commands

> 读取 exif 拍摄日期, 并添加到图片的右下角, 支持批量操作

```sh
# 使用 glob 需要单引号, 避免 glob 被 shell 处理
$ img-tailor date '~/Downloads/imgs/*.heic'
```

命令会生成 `~/Downloads/imgs/with-date/*.with-date.jpeg`

效果
![image](https://user-images.githubusercontent.com/4067115/130257138-073c3bee-3824-41ed-bc30-c6dd86abce2b.png)

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
