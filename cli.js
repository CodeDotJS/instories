#!/usr/bin/env node

'use strict';

const os = require('os');
const dns = require('dns');
const fs = require('fs');
const fse = require('fs-extra');
const instory = require('instory');
const download = require('download');
const log = require('log-update');
const jsonfile = require('jsonfile');
const ora = require('ora');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const cbg = chalk.green.bold('›');
const cbr = chalk.red.bold('›');
const arg = process.argv[2];
const inf = process.argv[3];
const end = process.exit;
const dim = chalk.dim; // eslint-disable-line prefer-destructuring
const spinner = ora();
const dir = `${os.homedir()}/instagram/story_${arg}/`;
const file = `${dir}${arg}_${new Date().toLocaleString().substr(0, 10)}.json`;

if (!arg || arg === '-h' || arg === '--help') {
	log(`
 Usage: instory <username> [command]

 Command:
  -a, ${dim('--all')}          Download all the stories
  -i, ${dim('--images')}       Download only images
  -v, ${dim('--videos')}       Download only videos
  -c, ${dim('--check')}        Check total number of stories
  -e, ${dim('--export')}       Export the downloadable urls
  -r, ${dim('--remove')}       Remove all the stories of a user

 Help:
  -h, ${dim('--help')}         Display help
		`);
	end(1);
}

const connection = () => {
	dns.lookup('storiesig.com', err => {
		if (err) {
			log(`\n${cbr} Please check your internet connection! \n`);
			end(1);
		} else {
			log();
			spinner.text = 'Please wait...';
			spinner.start();
		}
	});
};

const mdir = () => {
	if (!fs.existsSync(dir)) {
		fse.ensureDir(dir, err => {
			if (err) {
				log(err);
				end(1);
			}
		});
	}
};

const downloadMessage = (storyCount, user) => {
	spinner.text = ` ${chalk.white('Downloading')} ${chalk.keyword('yellow')(storyCount)} ${chalk.white('stories by')} ${chalk.keyword('orange')(user)}`;
};

const statusUpdate = () => {
	log(`\n${cbg} Download Complete \n`);
	spinner.stop();
};

const len = n => {
	if (n.length === 0) {
		log(`\n${cbr} No stories found! \n`);
		fs.rmdir(dir);
		end(1);
	}
};

const handleError = () => {
	log(`\n${cbr} ${chalk.yellow(arg)} is not an instagram user! \n`);
	end(1);
};

const excludeDownload = opt => {
	mdir();
	connection();
	if (opt) {
		instory(arg, opt).then(res => {
			len(res);
			downloadMessage(`${res.length}`, arg);
			Promise.all(res.map(x => download(x, dir))).then(() => {
				statusUpdate();
			});
		}).catch(error => {
			if (error) {
				handleError();
			}
		});
	} else {
		instory(arg).then(res => {
			len(`${res.story}`);
			downloadMessage(`${res.story.length}`, arg);
			Promise.all(res.story.map(x => download(x, dir))).then(() => {
				statusUpdate();
			});
		}).catch(error => {
			if (error) {
				handleError();
			}
		});
	}
};

if (inf === '-a' || inf === '--all') {
	excludeDownload();
}

if (inf === '-i' || inf === '--images') {
	excludeDownload('video');
}

if (inf === '-v' || inf === '--videos') {
	excludeDownload('image');
}

if (inf === '-c' || inf === '--check') {
	connection();
	instory(arg).then(res => {
		log(`\n${cbg} Total stories by ${chalk.white(arg)} : ${chalk.yellow(res.story.length)}\n`);
		spinner.stop();
	}).catch(error => {
		if (error) {
			handleError();
		}
	});
}

if (inf === '-e' || inf === '--export') {
	connection();
	instory(arg).then(res => {
		fse.ensureFile(file, err => {
			if (err) {
				log(err);
				end(1);
			}
			const obj = {story: res.story};
			jsonfile.writeFile(file, obj, {spaces: 2}, err => {
				if (err) {
					log(err);
				}
				log(`\n${cbg} Saved! \n`);
				spinner.stop();
			});
		});
	}).catch(error => {
		if (error) {
			handleError();
		}
	});
}

if (inf === '-r' || inf === '--remove') {
	if (!fs.existsSync(dir)) { // eslint-disable-line no-negated-condition
		log(`\n${cbr} User not found!\n`);
		end(1);
	} else {
		fse.remove(dir, err => {
			if (err) {
				log(err);
			}
			log(`\n${cbr} ${chalk.green(arg)}'s stories has been deleted! \n`);
		});
	}
}
