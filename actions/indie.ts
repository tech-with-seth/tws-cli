import process from 'node:process';
import fs from 'npm:fs-extra';

interface FileMeta {
    name: string;
    src: string;
    dist: string;
}

export async function getAuth() {
    const BASE_URL = `https://raw.githubusercontent.com/remix-run/indie-stack/refs/heads/main/`;
    const targetRoot = process.cwd();
    const targetApp = `${process.cwd()}/app/`;
    const FILES: FileMeta[] = [
        { name: `session.server.ts`, src: `app/`, dist: targetApp },
        { name: `db.server.ts`, src: `app/`, dist: targetApp },
        { name: `singleton.server.ts`, src: `app/`, dist: targetApp },
        { name: `utils.ts`, src: `app/`, dist: targetApp },
        {
            name: `user.server.ts`,
            src: `models/`,
            dist: `${targetApp}/models/`
        },
        {
            name: `schema.prisma`,
            src: `prisma/`,
            dist: `${targetRoot}/prisma/schema.prisma`
        },
        {
            name: `seed.ts`,
            src: `prisma/`,
            dist: `${targetRoot}/prisma/seed.ts`
        },
        {
            name: `.env.example`,
            src: ``,
            dist: targetRoot
        }
    ];

    function editText(dataString: string) {
        return dataString.replace(/\@remix\-run\/(node|react)/, `react-router`);
    }

    async function pullFileText(fileMeta: FileMeta, base: string) {
        const response = await fetch(`${base}${fileMeta.src}${fileMeta.name}`);

        return response.text();
    }

    async function writeFile(fileMeta: FileMeta, data: string) {
        await fs.ensureDir(fileMeta.dist);
        await fs.ensureFile(`${fileMeta.dist}/${fileMeta.name}`);

        return fs.outputFile(
            `${fileMeta.dist}/${fileMeta.name}`,
            editText(data)
        );
    }

    await Promise.all(
        FILES.map(async (fileObj) => {
            const text = await pullFileText(fileObj, BASE_URL);

            return writeFile(fileObj, text);
        })
    );
}
