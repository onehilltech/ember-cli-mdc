const semver = require ('semver');

/**
 * Get the target version for the library.
 */
function target (version) {
  let prerelease = semver.prerelease (version);

  if (prerelease.length === 0) {
    // Let's update to the latest pre-release version.
    let coerced = semver.coerce (version);
    return `^${coerced}-${prerelease[0]}-0`;
  }
  else {
    // Let's update the latest minor version.
    let major = semver.major (version);
    return `^${major}.0.0`;
  }
}
