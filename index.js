import readline from 'readline';

function hitungGaji(jamKerja, tarifPerJam) {
	const jamNormal = 40;
	const tarifLembur = 1.5;
	let gajiAwal = 0;
	let totalGaji = 0;

	if (jamKerja <= jamNormal) {
		totalGaji = jamKerja * tarifPerJam;
	} else {
		const jamLembur = jamKerja - jamNormal;
		const gajiNormal = jamNormal * tarifPerJam;
		const gajiLembur = jamLembur * (tarifPerJam * tarifLembur);
		gajiAwal = gajiNormal;
		totalGaji = gajiNormal + gajiLembur;
	}

	return {
		jamKerja: jamKerja,
		jamNormal: jamNormal,
		jamLembur: Math.max(0, jamKerja - jamNormal),
		tarifPerJam: tarifPerJam,
		gajiAwal: gajiAwal,
		totalGaji: totalGaji
	};
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    try {
        const jamKerja = await new Promise(resolve => {
            rl.question('Masukkan jam kerja per minggu: ', answer => {
                resolve(parseFloat(answer));
            });
        });

        const tarifPerJam = await new Promise(resolve => {
            rl.question('Masukkan tarif per jam: ', answer => {
                resolve(parseFloat(answer));
            });
        });

        const hasil = hitungGaji(jamKerja, tarifPerJam);
        console.log('\nHasil Perhitungan:');
        console.log('==================');
        console.log(`Jam Kerja: ${hasil.jamKerja} jam`);
        console.log(`Jam Normal: ${hasil.jamNormal} jam`);
        console.log(`Jam Lembur: ${hasil.jamLembur} jam`);
        console.log(`Tarif per Jam: Rp ${hasil.tarifPerJam.toLocaleString()}`);
				console.log(`Gaji Normal: Rp ${hasil.gajiAwal.toLocaleString()}`);
				console.log(`Gaji Lembur: Rp ${(hasil.totalGaji - hasil.gajiAwal).toLocaleString()}`);
        console.log(`Total Gaji: Rp ${hasil.totalGaji.toLocaleString()}`);
    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    } finally {
        rl.close();
    }
}

main();

