<p align="center">
<br>
	<a href="https://www.npmjs.com/package/instories"><img src="media/logo.png" alt="instories" width="100"></a>
	<br>
	<img src="media/text4136.png" width="400">
	<br>
	<br>
	<a href="https://travis-ci.org/CodeDotJS/instories"><img src="https://travis-ci.org/CodeDotJS/instories.svg?branch=master"></a>
	<img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg">
</p>

<p align="center"><b>Download Instagram Stories from the Command-line!</b></p>


## Install

```
$ npm install --global instories
```
__`OR`__
```
$ sudo npm install --global instories
```

## Feature

- Option to download all the stories at once!
- Download either videos or images.
- Check how many stories a user has uploaded.
- Export the stories URLs for further use!

## Preview

<p align="center">
	<img src="media/preview.gif">
</p>


## Usage

```
Usage: instory <username> [command]

Command:
 -a, --all          Download all the stories
 -i, --images       Download only images
 -v, --videos       Download only videos
 -c, --check        Check total number of stories
 -e, --export       Export the downloadable urls
 -r, --remove       Remove all the stories of a user

Help:
 -h, --help         Display help

```

## NOTE

- Downloaded content gets saved under __`instagram/username_story/`__ folder in your __`home directory`__. That's the default path!
So, you just basically need to check __`/home/user/instagram/`__ folder after downloading the stories.

## Related

- __[`instory`](https://github.com/CodeDotJS/instory)__ `:`
	- Get downloadable URLs to the stories of an Instagram user!

	__`ALSO`__

	- API for this command-line tool!

## License

MIT - Copyright &copy; [Rishi Giri](http://rishi.ml)
