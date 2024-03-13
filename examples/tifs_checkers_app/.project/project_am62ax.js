let path = require('path');

let device = "am62ax";

const files = {
	common: [
		"safety_checkers_tifs_app.c",
		"main.c",
	],
};

/* Relative to where the makefile will be generated
 * Typically at <example_folder>/<BOARD>/<core_os_combo>/<compiler>
 */
const filedirs = {
	common: [
		"..",       /* core_os_combo base */
		"../../..", /* Example base */
	],
};

const libdirs_freertos = {
    common: [
        "${MCU_PLUS_SDK_PATH}/source/drivers/device_manager/dm_stub/lib",
        "${MCU_PLUS_SDK_PATH}/source/drivers/device_manager/rm_pm_hal/lib",
        "${MCU_PLUS_SDK_PATH}/source/drivers/device_manager/sciclient_direct/lib",
        "${MCU_PLUS_SDK_PATH}/source/drivers/device_manager/sciserver/lib",
        "${MCU_PLUS_SDK_PATH}/source/drivers/device_manager/self_reset/lib",
        "${MCU_PLUS_SDK_PATH}/source/kernel/freertos/lib",
        "${MCU_PLUS_SDK_PATH}/source/drivers/lib",
        "${MCU_PLUS_SDK_PATH}/source/board/lib",
        "${MCU_PLUS_SDK_PATH}/source/safety_checkers/lib",
    ],
};


const includes_freertos_r5f = {
    common: [
        "${MCU_PLUS_SDK_PATH}/source/kernel/freertos/FreeRTOS-Kernel/include",
        "${MCU_PLUS_SDK_PATH}/source/kernel/freertos/portable/TI_ARM_CLANG/ARM_CR5F",
        "${MCU_PLUS_SDK_PATH}/source/kernel/freertos/config/am62ax/r5f",
        "${MCU_PLUS_SDK_PATH}/source/safety_checkers/src",
        "${MCU_PLUS_SDK_PATH}/source/safety_checkers/src/soc",
        "${MCU_PLUS_SDK_PATH}/source/safety_checkers/src/soc/am62ax/",
        "${MCU_PLUS_SDK_PATH}/source/drivers/",
        "${MCU_PLUS_SDK_PATH}/source/drivers/hw_include/",
        "${MCU_PLUS_SDK_PATH}/source/safety_checkers/examples/tifs_checkers_app/soc/am62ax/",
    ],
};

const libs_freertos_r5f = {
	common: [
		"freertos.am62ax.r5f.ti-arm-clang.${ConfigName}.lib",
		"drivers.am62ax.r5f.ti-arm-clang.${ConfigName}.lib",
		"board.am62ax.r5f.ti-arm-clang.${ConfigName}.lib",
		"safety_checkers.am62ax.r5f.ti-arm-clang.${ConfigName}.lib",
	],
};

const lnkfiles = {
	common: [
		"linker.cmd",
	]
};

const syscfgfile = "../example.syscfg";

const readmeDoxygenPageTag = "EXAMPLES_SAFETY_CHECKERS";

const templates_freertos_mcu_r5f =
[
	{
		input: ".project/templates/am62ax/common/linker_mcu-r5f.cmd.xdt",
		output: "linker.cmd",
	},
	{
		input: ".project/templates/am62ax/freertos/main_freertos.c.xdt",
		output: "../main.c",
		options: {
		entryFunction: "SafetyCheckersApp_tifsTest",
		},
	}
];

const buildOptionCombos = [
    { device: device, cpu: "mcu-r5fss0-0", cgt: "ti-arm-clang", board: "am62ax-sk", os: "freertos"},
];

function getComponentProperty() {
    let property = {};

    property.dirPath = path.resolve(__dirname, "..");
    property.type = "executable";
    property.name = "SafetyCheckersApp_tifs";
    property.isInternal = false;
    property.tirexResourceSubClass = [ "example.gettingstarted" ];
    property.description = "TIFS safety checkers app"
    property.buildOptionCombos = buildOptionCombos;

    return property;
}

function getComponentBuildProperty(buildOption) {
    let build_property = {};

    build_property.files = files;
    build_property.filedirs = filedirs;
    build_property.lnkfiles = lnkfiles;
    build_property.syscfgfile = syscfgfile;
    build_property.readmeDoxygenPageTag = readmeDoxygenPageTag;

    if(buildOption.cpu.match(/mcu-r5f*/)) {
        if(buildOption.os.match(/freertos*/) )
        {
            build_property.includes = includes_freertos_r5f;
            build_property.libdirs = libdirs_freertos;
            build_property.libs = libs_freertos_r5f;
            build_property.templates = templates_freertos_mcu_r5f;
        }
    }

    return build_property;
}

module.exports = {
    getComponentProperty,
    getComponentBuildProperty,
};

