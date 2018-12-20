import childProcess from 'child_process';
import test from 'ava';

test.cb('now', t => {
	const cp = childProcess.spawn('./cli.js', ['9gag', '--all'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});
